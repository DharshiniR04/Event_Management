import React, { useEffect, useState } from "react";
import './Event.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectedEvent } from "../../context/eventContext";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LoadBack from '../../assets/event.png';
import { SelectedEmail } from "../../context/EmailContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function Event() {
    const { email } = SelectedEmail();
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);
    const [filterData, setFilter] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [visibleItems, setVisibleItems] = useState(6);
    const navi = useNavigate();
    const { setEvent } = SelectedEvent();

    useEffect(() => {
        const fetchData = async () => {
            if (email?.[0] !== "") {
                try {
                    setLoading(true);
                    const response = await axios.get("http://localhost:3000/event");
                    setData(response.data);
                } catch (err) {
                    console.log("Pro Error", err);
                } finally {
                    setLoading(false);
                }
            }
            else {
                navi('../login');
            }
        };
        fetchData();
    }, [email, navi]);

    const FilterData = (searchValue) => {
        if (!searchValue) {
            setFilter(Data);
        } else {
            const filteredEvents = Data.filter((event) => {
                return event.category.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilter(filteredEvents);
        }
    };


    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearchButtonClick = () => {
        FilterData(searchValue);
    }

    const loadMoreItems = () => {
        setVisibleItems((Items) => Items + 3);
    };

    const handleAdd = async (item) => {
        setEvent(item);
        navi('../detail');
    };

    return (

        <>
            <Navbar />
            {loading ? (
                <div id="load-back">
                    <img src={LoadBack} alt="Loading" />
                </div>
            ) : (
                <>
                    <div>
                        <div id="text3">
                            <h3>Search</h3>
                            <input type="text" value={searchValue} onChange={handleSearchInputChange} placeholder="       Events"></input>
                            <button id="search" onClick={handleSearchButtonClick}><FontAwesomeIcon icon={faSearch} /></button>
                        </div>
                        <div id="text5">
                            <h3>{(filterData && filterData?.[0]?.category)} Events</h3>
                            <div className="box-container">
                                {filterData.slice(0, visibleItems).map((item, index) => (
                                    <div className="box" key={index}>
                                        <img src={item.img} alt={item.name}></img>
                                        <h4><span>Contest: </span>{item.name}</h4>
                                        <h4>{item.desc}</h4>
                                        <h4><span>Organizer: </span>{item.organizer}</h4>
                                        <h4><span>Contact: </span>{item.contact}</h4>
                                        <button id="btn" onClick={() => handleAdd(item)}>View More</button>
                                    </div>
                                ))}
                                {filterData.length === 0 && Data && Data.slice(0, visibleItems).map((item, index) => (
                                    <div className="box" key={index}>
                                        <img src={item.img} alt={item.name}></img>
                                        <h4><span>Contest: </span>{item.name}</h4>
                                        <h4>{item.desc}</h4>
                                        <h4><span>Organizer: </span>{item.organizer}</h4>
                                        <h4><span>Contact: </span>{item.contact}</h4>
                                        <button id="btn" onClick={() => handleAdd(item)}>View More</button>
                                    </div>
                                ))}

                            </div>
                            {visibleItems < filterData.length && (
                                <button onClick={loadMoreItems} id="button">Load More</button>
                            )}
                            {filterData.length === 0 && visibleItems < Data.length && (
                                <button onClick={loadMoreItems} id="button">Load More</button>
                            )}
                        </div>
                    </div>


                </>)}
            <Footer />
        </>

    )
}

export default Event;