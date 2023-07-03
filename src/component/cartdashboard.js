import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItems, quantityProduct, removeProduct } from '../cart';
import { Checkbox } from '@progress/kendo-react-inputs';
import QuantityRange from './QuantityRange';
import { setDistinct } from 'mathjs';


const Cart = () => {

    const dispatch = useDispatch()
    const { listItems: cartItem, amount } = useSelector((state) => state.cart)
    // console.log(cartItem)


    const removeCart = (product) => {
        dispatch(removeProduct(product))
    }

    const deleteAll = () => {
        dispatch(deleteItems())
    }

    const onValueChange = (item) => {
        dispatch(quantityProduct(item))
    }


    return (
        <div>
            <center>
                <h1>Cart</h1>
            </center>
            <div className="row" style={{ width: "100%" }}>
                <Checkbox onChange={() => deleteAll()} className="col-md-6 text-center">Remove All</Checkbox>
                <p className="col-md-6 text-center">Total Amount : <span style={{ fontWeight: "600" }}>{amount}{" "}/-</span> </p>
            </div>
            <div className="row" style={{ width: "100%" }} >
                {setDistinct(cartItem).map((product) => (
                    <Card key={product.id} style={{ width: '18rem', height: "250px" }} className="col-md-3 m-auto mb-2 text-center">
                        <Card.Img variant="top" src={product.images[0]} style={{ width: "100px", height: "100px", marginTop: "10px" }} className='rounded mx-auto d-block' />
                        <Card.Body>
                            <Card.Title style={{ fontSize: "12px" }}>{product.title}</Card.Title>
                            <Card.Text style={{ fontSize: "14px" }}>
                                INR {product.price}
                            </Card.Text>
                            <QuantityRange item={product} key={product.id} getValue={onValueChange} />
                            <Button variant="danger" onClick={() => removeCart(product)}>Remove Cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )

}

export default Cart 