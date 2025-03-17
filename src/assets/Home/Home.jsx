import './Home.css';
import logo from '../Images/logo.png';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";
import { IoIosDocument } from "react-icons/io";

function Home() {
    const [numPics, setNumPics] = useState(""); 
    const [filteredPics, setFilteredPics] = useState([]);

    const { refetch, isFetching, isError, error } = useQuery({
        queryKey: ["lorem"],
        queryFn: async () => {
            const response = await fetch(`https://picsum.photos/v2/list`);
            if (!response.ok) {
                throw new Error("Error fetching photos");
            }
            return response.json();
        },
        enabled: false, 
    });

    function handleSearch() {
        if (numPics > 0) {
            refetch().then((result) => {
                if (result.data) {
                    setFilteredPics(result.data.slice(0, numPics)); 
                }
            });
        } else {
            setFilteredPics([]);
        }
    }

    return (
        <>
            <div className="landing-page">
                <div className="header-section">
                    <div className="header-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header-middles">
                    <div className="header-text">
                        <h1 className="header-branding">
                            Get Random Lorem PicSum
                        </h1>
                    </div>
                    <div className="input-section">
                    <input
                        type="number"
                        value={numPics}
                        onChange={(e) => setNumPics(Number(e.target.value))} 
                        className="lorem-input"
                        placeholder="Enter the Number of photos"
                    />
                    <button className="search-btn" type="button" onClick={handleSearch}>
                        <IoSearchSharp /> Search
                    </button>
                </div>
                    </div>
                    <div className="header-icons">
                        <a href="#" className="header-document"><IoIosDocument /></a>
                        <a href="#" className="header-help"><BiSolidHelpCircle />Help</a>
                    </div>
                </div>

                <div className="status-message">
                    {isFetching && <h1 className="loading-message">Loading... Please Wait</h1>}
                    {isError && <h1 className="error-message">{error.message}</h1>}
                </div>

                <div className="image-plate">
                    {filteredPics.length > 0 && filteredPics.map((pic) => (
                        <div key={pic.id} className="image-item">
                            <div className="image-wrapper">
                            <img src={pic.download_url} alt={pic.author} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
