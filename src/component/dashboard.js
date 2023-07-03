import React, { useEffect } from 'react'
import { getProducts } from '../products'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { addProduct } from "../cart"
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusCode from '../uitils';
import { Alert } from 'react-bootstrap';

const Dashboard = () => {

    const dispatch = useDispatch()
    const { data: products, status } = useSelector((state) => state.product)

    // eslint-disable-next-line
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const addtocart = (product) => {
        dispatch(addProduct(product))
    }
    if (status === StatusCode.LOADING) {
        return <div>
            <center>Loading...</center></div>
    } else if (status === StatusCode.ERROR) {
        return <Alert key="danger" variant="danger" className="text-center">Oops! Something Went Wrong</Alert>
    }
    return (
        <div>
            <center>
                <h1>Products</h1>
            </center>
            <div className="row" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", overflowY: "scroll" }}>
                {products.map((product) => (
                    <Card key={product.id} style={{ width: '18rem', height: "250px" }} className="col-md-3 m-auto mb-2 text-center">
                        <Card.Img variant="top" src={product.images[0]} style={{ width: "100px", height: "100px", marginTop: "10px" }} className='rounded mx-auto d-block' />
                        <Card.Body>
                            <Card.Title style={{ fontSize: "12px" }}>{product.title}</Card.Title>
                            <Card.Text style={{ fontSize: "14px" }}>
                                INR {product.price}
                            </Card.Text>

                            <Button variant="primary" type="button" onClick={() => addtocart(product)}>Add Cart</Button>
                        </Card.Body>
                    </Card>

                ))}

            </div>

        </div>
    )
}

export default Dashboard