import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async() => {
        setLoading(true);
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const detailData = await data.json();
        
        if(detailData.id){
            console.log(detailData);
            setDetails(detailData);
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return( 
        <DetailWrapper>
            { (details) && (
                <>
                    <div>
                        <h2>{details.title}</h2>
                        <img src={details.image} alt=""/>
                    </div>
                    <Info>
                        <Link to={'/'}>
                            <Button className="ingredients">
                                    <IoChevronBackOutline/>
                            </Button>
                        </Link>
                        <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                        {activeTab === 'instructions' && (
                            <div>
                                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                                <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                            </div>
                        )}
                        {activeTab === 'ingredients' && (
                            <>
                                <IngredientPadding>
                                    <ul>
                                        {details.extendedIngredients.map((ingredient) => {
                                            return(
                                                <li key={ingredient.id}>{ingredient.original}</li>
                                            )
                                        })}
                                    </ul>
                                </IngredientPadding>
                            </>
                        )}
                    </Info>
                </>
            )}
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 7rem;
    margin-bottom: 5rem;
    display: flex;

    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2{
        margin-bottom: 2rem;
    }

    li{
        font-size: 1.2rem;
    }

    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`;

const Info = styled.div`
    margin-left: 6rem;
`;

const IngredientPadding = styled.div`
    padding: 19px;
`

export default Recipe