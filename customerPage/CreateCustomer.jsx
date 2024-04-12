import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const CreateCustomer = () => {
    const navigate = useNavigate()
    const [customData, setCustomData] = useState([])
  
    //country list for making input options 

    const countryList = [
        "Afghanistan",
        "Åland Islands",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan (Province of China)",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];

    //getting input values from user and send to backend

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(customData);
        await axios.post('https://crm-backend-okn5.onrender.com/customer/createCustomer', customData)
            .then(res => {
                toast(res.data.message)
                setTimeout(() => {
                    navigate('/dashboardHome/customers')
                }, 5000);
            })
            .catch(err => toast(err.message))
    }
    
    //storing input values in the temporary variable
    const handleChange = (e) => {

        setCustomData((pval) => ({ ...pval, [e.target.id]: e.target.value }))

    }

    return (
        <div className='container row '>

            <form onSubmit={handleSubmit} >
                <ToastContainer />
                <div className=' d-flex flex-column flex-md-row text-center'>
                    <div className='col-sm-12 col-lg-6 '>
                        <h5 className='ms-4 border-bottom p-2 text-white'>Add Customer</h5>
                        <div className='card m-4 card-body'>
                            <div className='container m-2 align'>
                                <label htmlFor="name" className='my-2 fw-bold '>Name<span>*</span> </label>
                                <input type="text" className=' rounded' id='name' placeholder='Name' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="phone" className='my-2 fw-bold '>Phone<span>*</span> </label>
                                <input type="tel" className=' rounded' id='phone' placeholder='phone number' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="email" className='my-2 fw-bold '>Email<span>*</span> </label>
                                <input type="email" className=' rounded' id='email' placeholder='Email' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="street" className='my-2 fw-bold '>Street<span>*</span> </label>
                                <input type="text" className=' rounded' id='street' placeholder='Street' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="city" className=' my-2 fw-bold '>City<span>*</span> </label>
                                <input type="text" className=' rounded' id='city' placeholder='city' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="state" className='my-2 fw-bold '>State <span>*</span> </label>
                                <input type="text" className=' rounded' id='state' placeholder='state' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="zipcode" className='my-2 fw-bold '>Zip Code<span>*</span> </label>
                                <input type="number" className='rounded' id='zipcode' placeholder='Zip Code' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="website" className='my-2 fw-bold '>Website <span>*</span> </label>
                                <input type="url" className='rounded' id='website' placeholder='Website' required onChange={(e) => { handleChange(e) }} /><br />
                                <label htmlFor="country" className='my-2 fw-bold'>Country</label>
                                <select className="form-select " id="country" name="country" required onChange={(e) => { handleChange(e) }} >
                                    <option value="">select country</option>
                                    {countryList.map((item) => {
                                        return (
                                            <option value={item}>{item}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className='text-center'> <button className='btn btn-primary m-2' type="submit">Create</button></div>
                    </div>
                    <div className=' col-md-6 d-none d-lg-inline m-4'>
                        <img className='border border-dark rounded-pill m-4 card-body' src="https://cdn3.iconfinder.com/data/icons/budicon-chroma-contact/24/user-add-512.png" alt="Customer" width={350} />
                        <h1 className='ms-3 text-white' >Add<sup>+</sup></h1>
                    </div>
                    /

                </div>
            </form>
        </div>
    );
};

export default CreateCustomer;