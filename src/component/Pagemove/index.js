import Pagination from 'react-bootstrap/Pagination'

const Pagemove=(props)=>{
    const {item,displaypage}=props 
    const show=()=>{
         displaypage(item)

    }
    return <Pagination.Item key={item} onClick={show}> {item} </Pagination.Item> 
}

export default Pagemove