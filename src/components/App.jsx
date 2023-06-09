import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { apiFetch } from "./Api/Api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Message } from "./Message/Message";

export class App extends Component  {

  state = {
    searchPromt: '',
    page: 1,
    imagesArr: [],
    totalImages: 0,
    status: 'idle'
  }

 

  submitHandler = (evt) => {
    evt.preventDefault()
    this.setState({ searchPromt: evt.target.elements.search.value.trim(), page: 1 }, async () => {
      if (!this.state.searchPromt) {
      return
      }
      try {
        this.setState({status: 'pending'})
        const images = await apiFetch(this.state.searchPromt, this.state.page)
        this.setState({ imagesArr: images.data.hits, totalImages: images.data.totalHits, status: 'resolved' })
      } catch (e) {
        this.setState({status: 'rejected'})
      }
    })
    
  }

  loadMoreImg =  () => {
    this.setState({ page: this.state.page + 1 }, async () => {
       try {
      const images = await apiFetch(this.state.searchPromt, this.state.page)
      this.setState(prevState => ({
        imagesArr: [...prevState.imagesArr, ...images.data.hits]
        }));
      } catch (e) {
        alert('Something went wrong')
      }
    })
   
  }

  render() {
     const {status, imagesArr, totalImages} = this.state
    return (
      <>
        <Searchbar onSubmit={this.submitHandler} />
        <div className="container">
          {status === 'idle' ? <Message text='Fulfill your imagination'/>
            : status === 'pending' ? <Loader />
            : status === 'resolved' ? imagesArr.length === 0 ? <Message text='Nobody here but us chickens!'/> : <><ImageGallery data={imagesArr} />{totalImages > imagesArr.length ? <Button loadMore={this.loadMoreImg} />: <Message text='Hope it`s fulfilled'/>}</>
            : <Message text='Something went wrong'/>}
        </div>
      </>);
  } 
};
