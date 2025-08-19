import { useState, useEffect } from "react";
import './styles.css'

const LoadMore = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDiableButton] = useState(false);

    const fetchProducts = async () => {
        try {

            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`);

            const result = await response.json();

            if (result && result.products && result.products.length) {
                setProducts(prev => {
                    const newItems = result.products.filter(
                        p => !prev.some(existing => existing.id === p.id)
                    );
                    return [...prev, ...newItems];
                    });
                setLoading(false);
            }
            
            setLoading(false);
        } catch (error) {
           console.log(error); 
        }
    }
    useEffect(() => {
        console.log(JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, [count])

    useEffect (() => {
        if (products && products.length === 100) {
            setDiableButton(true);
        }
    }, [products])
    
    if (loading) {
        return (
            <div>Loading data...</div>
        )
    }
    
    return (
        <div className="load-more-container">
            <div className="product-container">
                {products && products.length ?
                products.map(item => <div key={item.id} className="product">
                    <img src={item.thumbnail} alt={item.title} />
                    <p>{item.title}</p>
                </div>) : null}
            </div>
            <div className="button-container">
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Products</button>
            </div>
            {disableButton ? <p>You have reached the limit of products.</p> : null}
        </div>
    );
}

export default LoadMore;