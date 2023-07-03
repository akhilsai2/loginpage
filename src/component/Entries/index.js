import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { Triangle } from 'react-loader-spinner'
import Axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'
import Pagemove from '../Pagemove'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

class Entries extends Component {
    state = { fetchedData: [], visibleData: [], items: [], Loading: false, lastItems: [], pagenum: '' ,dropnum:10}
    
    componentDidMount() {
        console.log("mount")
        this.renderData()
        this.renderPage()
        // this.renderLastPage()

    }

    renderData = async () => {
        this.setState({ Loading: true })
        const response = await Axios.get("https://api.publicapis.org/entries")
        const data = await response.data
        const resetData = data.entries.map(each => ({
            id: uuidv4(),
            apis: each.API,
            auth: each.Auth,
            category: each.Category,
            cors: each.Cors,
            description: each.Description,
            https: each.HTTPS,
            link: each.Link,
        }))
        const {dropnum}=this.state
        this.setState({ fetchedData: resetData, visibleData: resetData.slice(0, dropnum), Loading: false, pagenum: 1 },this.renderLastPage)
    }

    renderPage = () => {
        let pages = [];
        for (let i = 1; i <= 6; i++) {
            pages.push(i)              
        }
        this.setState({ items: pages })
    }

    renderLastPage = () => {
        const {fetchedData,dropnum}=this.state
        const numshow=Math.ceil(fetchedData.length/dropnum)
        let pages = [];
        for (let i = numshow-6; i <= numshow; i++) {
            pages.push(i)             
        }
        this.setState({ lastItems: pages })
    }

    display = (num) => {
        console.log(num)
         const {dropnum}=this.state
        const firstIndex = num * dropnum - dropnum
        const EndIndex = num * dropnum
        const { fetchedData } = this.state
        this.setState({ visibleData: fetchedData.slice(firstIndex, EndIndex), Loading: false, pagenum: num })
        // window.scrollTo(0, 0)
        // if(call){
        //     this.pushNum()
        //    // console.log("p")
        // }

    }

    increaseNum=(num)=>{
        const {items}=this.state
        items.shift()
        this.setState(prevState=>({items:[...prevState.items,num]}))
    }

    pushNum=()=>{
        const {items}=this.state
        if (items[0]>1 && items[0]<137){ 
        const prevNum=items[0]-1
        items.pop()
        this.setState(prevState=>({items:[prevNum,...prevState.items]}))
        }       
    }

    selectvalue=(event)=>{
        const ListNum=Array.from(Array(6).keys())
        const numList=ListNum.map(each=>each+1)
        this.setState({dropnum:event.target.value,items: numList},this.renderData)
      }

    paginationRender = () => {
        const { pagenum, lastItems, items } = this.state
        return (
            <div className="showCont">
            <Pagination >
                <Pagination.First onClick={(()=>this.display(1))}/>              
                <Pagination.Prev onClick={(()=>{
                    const item=pagenum
                    if (item>1){
                    this.display(item-1)
                    this.pushNum()
                    }
                })}/>              
                {/* <Pagelast item={pagenum} displaypage={this.display} shownum={this.pushNum} /> */}
                {items.map(each => <Pagemove key={each} item={each} displaypage={this.display} /> ) }              
                <Pagination.Ellipsis onClick={()=>{
                    const item=pagenum
                     if (item>5 && item<137){
                        this.display(item+1)
                        this.increaseNum(item+1)
                        }
                }}/>              
                {lastItems.map(each =>  <Pagination.Item key={each} onClick={()=>this.display(each)}> {each} </Pagination.Item> )} 
                <Pagination.Next onClick={()=>{
                    const item=pagenum 
                    const rowNum=items[items.length-1]
                      if (item<138){
                        this.display(item+1)
                        this.increaseNum(rowNum+1)
                        }
                }}/>
           <Pagination.Last onClick={(()=>this.display(143))}/>
            </Pagination>
            </div>
        )
    }

    headerRender=()=>(
        <nav className="nav-cont ">
        <Link to="/" className="navi">
            <img src="https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg" alt="hand" className="image" />
        </Link>
        <Link to="/userdata" className="navi">
            <p className="userlink text-primary">Data</p>
        </Link>
        <button className="logBtn" type="button" onClick={this.remove}>LogOut</button>
    </nav>
    )

  

    render() {
        const { fetchedData, visibleData, Loading,pagenum ,dropnum} = this.state
        const resultnum=Math.ceil(fetchedData.length/dropnum)
        return (
            <>
               {this.headerRender()}
                <div className="data">
                    {Loading ? (<div className="loaderCont">
                        <Triangle
                            height="60"
                            width="60"
                            color="#4fa94d"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>)
                        :
                        <table className="table table-dark table-hover " style={{ width: "100%" }} >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>API</th>
                                    <th>AUTH</th>
                                    <th>Category</th>
                                    <th>CORS</th>
                                    <th>Description</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleData.map(each => {
                                    const Num = fetchedData.indexOf(each)
                                    // console.log(Num)
                                    return (
                                        <tr key={each.id} >
                                            <td>{Num + 1}</td>
                                            <td>{each.apis}</td>
                                            <td>{each.auth}</td>
                                            <td>{each.category}</td>
                                            <td>{each.cors}</td>
                                            <td>{each.description}</td>
                                            <td> <Link to={`${each.link}`} className="link" target="_blank">{each.link}</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                    <div className="displayCont">
                    <div className="pageCont">
                        <p className="page">Showing <span>{pagenum}</span> of <span>{resultnum}</span> results</p>
                    </div>
                    <select className="select" onChange={this.selectvalue} >
                        <option value={10} >10</option>
                        <option value={25} >25</option>
                        <option value={50} >50</option>
                        <option value={100} >100</option>
                    </select>
                    </div>
                    {this.paginationRender()}

                </div>
            </>
        )
    }
}
export default Entries

