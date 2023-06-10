import { useEffect, useState } from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { apiFetch } from "./Api/Api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Message } from "./Message/Message";
import { toast, Toaster } from "react-hot-toast";

export const App = () => {
  const [searchPromt, setSearchPromt] = useState('');
  const [page, setPage] = useState(1);
  const [imagesArr, setImagesArr] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');

  
  useEffect(() => {
    if (!searchPromt) {
      return
    }
    (async () => {
      try {
        setStatus('pending');
        const images = await apiFetch(searchPromt, page);
        setImagesArr(images.data.hits);
        setTotalImages(images.data.totalHits);
        setStatus('resolved');
      } catch (e) {
        setStatus('rejected');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPromt]);
  
  useEffect(() => {
  if (page === 1) {
    return;
  }
  (async () => {
    try {
      const images = await apiFetch(searchPromt, page);
      setImagesArr(prevArr => [...prevArr, ...images.data.hits]);
    } catch (e) {
      setStatus('rejected');
    }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);

  const submitHandler = async (evt) => {
    evt.preventDefault()
    if (!evt.target.elements.search.value.trim()) {
      const notify = () => toast.error('Please, fill the search field.');
      return notify()
    }
    setSearchPromt(evt.target.elements.search.value.trim());
    setPage(1);
  }

  return (
    <>
      <Searchbar onSubmit={submitHandler} />
      <div className="container">
        {status === 'idle' ? <Message text='Fulfill your imagination'/>
          : status === 'pending' ? <Loader />
          : status === 'resolved' ? imagesArr.length === 0 ? <Message text='Nobody here but us chickens!'/> : <><ImageGallery data={imagesArr} />{totalImages > imagesArr.length ? <Button loadMore={()=> setPage(prevPage => prevPage + 1)} />: <Message text='Hope it`s fulfilled'/>}</>
          : <Message text='Something went wrong' />}
        <Toaster position="top-right" toastOptions={{duration: 1500}} />
      </div>
    </>);
};
