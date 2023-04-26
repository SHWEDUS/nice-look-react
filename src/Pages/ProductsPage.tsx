import React, {useContext} from "react";
import {useProducts} from "../hooks/products";
import {ModalContext} from "../context/ModalContext";
import {IProduct} from "../models";
import {Loader} from "../components/Loader";
import {ErrorMeassage} from "../components/ErrorMeassage";
import {Product} from "../components/Product";
import {Modal} from "../components/Model";
import {CrateProduct} from "../components/CrateProduct";

export function ProductsPage() {
    const {loading, error, products, addProduct} = useProducts()
    const {modal, open, close} = useContext(ModalContext)

    const createHandler = (product: IProduct) => {
        close()
        addProduct(product)
    }
    return (
        <div className='container mx-auto max-w-2xl pt-5'>
            {loading && <Loader/>}
            {error && <ErrorMeassage error={error}/>}
            {products.map(product => <Product product={product} key={product.id}/>) }
            {modal && <Modal title="Create new product" onClose={close}>
                <CrateProduct onCreate={createHandler}/>
            </Modal>}
            <button
                className="fixed bottom-5 right-5 rounded-2xl bg-amber-300 text-white text-2xl w-16 h-10 text-center pb-0.5"
                onClick={open}
            >+</button>
        </div>
    )
}