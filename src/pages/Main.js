import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';

export default function Main(){
    const [imgURL, setImgURL] = useState('');
    const [list, setList] = useState([]);
    const [dog, setDog] = useState('');
    const [dogName, setDogName] = useState('');
    const [font, setFont] = useState('');
    const [colorFont, setColorFont] = useState('');
    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');


    const handleDogName = e => {
        setDogName(e.target.value);
    }

    const handleColorFont = e => {
        setColorFont(e.target.value);
    }

    const handleFontSelect = e => {
        setFont(e.target.value);
    }

    const handleBreedSelect = async (e) => {
        setDog(e.target.value);
        let url = "https://dog.ceo/api/breed/" + e.target.value + "/images/random";
        
        await axios.get(url).then(resp => {
            setImgURL(resp.data.message);
        }).catch(err => {
            console.log("Error image");
        });
    }


    const saveStorage = () => {
        const day = new Date().toLocaleDateString();
        const hour = new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0");
        setDay(day);
        setHour(hour);
        localStorage.setItem('Dog', dog);
        localStorage.setItem('Img URL', imgURL);
        localStorage.setItem('Dog Name', dogName);
        localStorage.setItem('Font', font);
        localStorage.setItem('Color font', colorFont);
        localStorage.setItem('Day',day);
        localStorage.setItem('Hour',hour);
        alert('Cachorro salvo com sucesso');

    }




    useEffect(() => {
        axios.get(`https://dog.ceo/api/breeds/list`).then(resp =>{
            setList(list.concat(resp.data.message))
        }).catch(err => {
            console.log("Errror fetching", err);
        })
    }, [list]);







    return( 
        <div className="container">
            <div className="box">
                <h1>Dog API</h1>
                <div className="search-box">
                    <div className="select-breed">
                        <select value={dog} onChange={handleBreedSelect}>
                            <option value="">Dog Breed</option>
                            {list.map(e => (
                                <option value={e} key={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input">
                        <input type="text" name="name" placeholder={dogName === "" ? "Dog Name" : dogName} onChange={handleDogName} />
                    </div>
                    <div className="select-font">
                        <select value={font} onChange={handleFontSelect}>
                            <option value="">Font</option>
                            <option value="font1" className="font1">Montserrat</option>
                            <option value="font2" className="font2">Noto Sans JP</option>
                            <option value="font3" className="font3">Oswald</option>
                            <option value="font4" className="font4">Poppins</option>
                            <option value="font5" className="font5">Raleway</option>


                        </select>
                    </div>
                    <div className="select-color">
                        <select value={colorFont} onChange={handleColorFont}>
                            <option value="">Font Color</option>
                            <option value="color1" className="color1">Color 1</option>
                            <option value="color2" className="color2">Color 2</option>
                            <option value="color3" className="color3">Color 3</option>
                            <option value="color4" className="color4">Color 4</option>
                            <option value="color5" className="color5">Color 5</option>
                        </select>
                    </div>
                    <button type="button" disabled={!dog}>Save</button>
                </div>
                <div className="img">
                    <img src={imgURL === "" ? "Image not found" : imgURL} className="imgDog"/>
                    <div className="txt-overlay">
                        <h5 className={font + " " + colorFont}>{dogName ===  "" ? "Dog Name" : dogName}</h5>
                        <p className={font + " " + colorFont}>{dog === "" ? "Dog Breed" : dog}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}