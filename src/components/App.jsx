import { useEffect, useRef, useState } from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { apiFetch } from "./Api/Api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Message } from "./Message/Message";
import { toast, Toaster } from "react-hot-toast";

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [imagesArr, setImagesArr] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');

  const prevsearchRequestRef = useRef(searchRequest);
  useEffect(() => {
    if (!searchRequest) return;
    
    (async () => {  
      if (prevsearchRequestRef.current !== searchRequest) {
        try {
          setStatus('pending');
          const images = await apiFetch(searchRequest, 1);
          setImagesArr(images.data.hits);
          setTotalImages(images.data.totalHits);
          setStatus('resolved');
          prevsearchRequestRef.current = searchRequest;
        } catch (e) {
          setStatus('rejected');
        }
      }

      if (page > 1) {
        try {
          const images = await apiFetch(searchRequest, page);
          setImagesArr(prevArr => [...prevArr, ...images.data.hits]);
        } catch (e) {
          setStatus('rejected');
        }
      }
    })();
  }, [searchRequest, page]);

  const submitHandler = evt => {
    evt.preventDefault()
    if (!evt.target.elements.search.value.trim()) {
      const notify = () => toast.error('Please, fill the search field.');
      return notify()
    } else if (evt.target.elements.search.value.trim() === searchRequest) {
      const notify = () => toast('Please use another request ;)', {icon: '😵‍💫'});;
      return notify()
    }
    setSearchRequest(evt.target.elements.search.value.trim());
    setPage(1);
  }

  return (
    <>
      <Searchbar onSubmit={submitHandler} />
      <div className="container">
        {status === 'idle' ? <Message text='Fulfill your imagination' /> : <></>}
        {status === 'pending' ? <Loader />: <></>}
        {status === 'resolved' ? !imagesArr.length  ? <Message text='Nobody here but us chickens!' />
          : <><ImageGallery data={imagesArr} />{totalImages > imagesArr.length ? <Button loadMore={() => setPage(prevPage => prevPage + 1)} />
            : <Message text='Hope it`s fulfilled' />}</> : <></>}
        {status === 'rejected' && <Message text='Something went wrong' />}
        <Toaster position="top-right" toastOptions={{duration: 1500, style: {border: '1px solid #713200'}}} />
      </div>
    </>);
};
