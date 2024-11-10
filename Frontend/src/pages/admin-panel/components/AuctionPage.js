import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/AuctionPage.css";
import { Link } from 'react-router-dom';
import { getAuthToken } from '../../../core/services/auth';

const AuctionPage = () => {
    const [auction, setAuction] = useState({loading: true, err: null});
    const {token, user} = getAuthToken();
    const params = useParams();

    useEffect( () => {
        const auctionsElements = [];

        Promise.all([
            axios.get('http://localhost:4000/api/Aucation'), 
            axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get('http://localhost:4000/api/Product')])
            .then( (resp) => {
                const auctionData = resp[0].data.aucation.find( (auc) => auc.id == params.auctionID );
                const usersData = resp[1].data;
                const productsData = resp[2].data.products;
                const categoryData = resp[2].data.category;
                const sellerID = productsData.find( (prod) => prod.id == auctionData.productID ).sellerID;

                setAuction({
                    ...auction,
                    loading: false,
                    err: null,
                    price: auctionData.price,
                    id: params.auctionID,
                    product: productsData.find( (prod) => prod.id == auctionData.productID),
                    bidder: usersData.find( (user) => user.id == auctionData.bidderID ),
                    seller: usersData.find( (user) => user.id == sellerID ),
                    category: categoryData.find( (cat) => cat.id == productsData.find( (prod) => prod.id === auctionData.productID).CategoryID ),
                });
        })
        .catch( (err) => setAuction({...auction, loading: false, err: [{msg: `something went wrong ${err}`}]}))
    }, [])

    const loadingSpinner = () => ( <div className="center-loader"><div className="loader"></div></div> )

    return (
        <div className='auction-view-container'>
            <Link to="/admin-home/auctions" className='auction-page-back'>◀ All auctions</Link>
                { auction.loading ? loadingSpinner() : 
                (
                <>
                    <div className='auction-view-title'>
                        <p>Auction #{params.auctionID}</p><h1>{auction.product.productName}</h1>
                    </div>
                    <div className='auction-view-grid'>
                        <div className='auction-view-box'>
                            <h2>Product Info</h2>
                            <h4>Title</h4>
                            <p>{auction.product.productName}</p>
                            <h4>Description</h4>
                            <p>{auction.product.desc}</p>
                            <h4>Category</h4>
                            <p>{auction.category.name}</p>
                            <h4>Image</h4>
                            <img src={ auction.product.productImage }/>
                        </div>
                        <div className='auction-view-box'>
                            <h2>Bidding Info</h2>
                            <h4>Status</h4>
                            <p>{ auction.product.state == 1 ? 'Sold' : 'Open for bidding' }</p>
                            <h4>Minimum bid amount</h4>
                            <p>{ auction.product.min_bid } LE</p>
                            <h4>Curret bidder</h4>
                            <p>{ auction.bidder.name }</p>
                            <h4>Curret bid amount</h4>
                            <p>{ auction.price } LE</p>
                            <h4>Start date</h4>
                            <p>{auction.product.start}</p>
                            <h4>End date</h4>
                            <p>{auction.product.end}</p>
                        </div>
                        <div className='auction-view-box'>
                            <h2>Seller Info</h2>
                            <h4>Seller</h4>
                            <Link to={ `/admin-home/seller/${auction.seller.id}`}><p>{ auction.seller.name }</p></Link>
                            <h4>Email</h4>
                            <p>{ auction.seller.email }</p>
                        </div>
                    </div>
                </>
                )}
        </div>
    );
};

export default AuctionPage;