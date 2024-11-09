import teslabot from "./images/teslabot.jpg";
import { useSelector } from "react-redux";

export default function Lab1() {
    const { message } = useSelector((state: any) => state.helloReducer);
    const { count } = useSelector((state: any) => state.counterReducer);
    return (
        //beginning of lab
        //TODO: FIX how the numbers and bullet points appear on the lists
        //input section 2.11.8 (Other HTML elements) in the last input field worked on earlier inside the form tag
        //Add the link to the Github repository on line 309
        <div id = "wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wb-redux-examples">
                Redux Data: <br/>
                { message } <br/>
                { count }
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>

                <p id="wd-p-1"> ... </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id="wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id="wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>
            </div>

            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Pour batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
            </div>

            <div id="wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List Tag</h5>
                How to make pancakes:
                <ol id="wd-pancakes"> ... </ol>
                My favorite recipe (Chicharron de pollo):
                <ol id="wd-your-favorite-recipe">
                    <li>Cut chicken breasts into small chunks.</li>
                    <li>Season chicken breasts chunks with freshly mashed garlic, onion powder, Goya Adobo,
                        black pepper, oregano, salt, and 1 lime's worth of lime juice</li>
                    <li>Stir to spread the seasoning evenly.</li>
                    <li>Allow the chicken to marinate for at least an hour if time allows it.</li>
                    <li>Season flour with garlic powder, onion powder, and adobo. Stir to season evenly.</li>
                    <li>Bread all chicken chunks with the seasoned flour.</li>
                    <li>Place oil in a pan. Allow it to pre-heat at medium-high heat.</li>
                    <li>Place chicken inside the pan. Do not overcrowd the pan!</li>
                    <li>Allow one side to cook for 3-5 minutes. If chicken does not look crispy on that side, keep cooking that side until crspy.</li>
                    <li>Once said side is crsipy, flip the chicken breast chunks.</li>
                    <li>Once done, shake any oil off and place on plate with a paper towel to suck up excess oil.</li>
                    <li>Apply more lime juice as a topping and enjoy! (for a fat-free version, put chicken in air-fryer for 20 minutes at 400 degrees fahrenheit!)</li>
                </ol>

                <h5>Unordered List Tag</h5>
                My favorite books (in no particular order)
                <ul id="wd-my-books">
                    <li>Dune</li>
                    <li>Lord of the Rings</li>
                    <li>Ender's Game</li>
                    <li>Red Mars</li>
                    <li>The Forever War</li>
                </ul>
                Your favorite books (in no particular order)
                <ul id="wd-your-books">
                    <li>Persepolis</li>
                    <li>A Thousand Splendid Suns</li>
                    <li>Yabo</li>
                </ul>

            </div>


            <div id="wd-tables">
                <h4>Table Tag</h4>
                <table border={1} width="100%">
                    <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Q1</td>
                        <td>HTML</td>
                        <td>9/17/24</td>
                        <td>85</td>
                    </tr>
                    <tr>
                        <td>Q2</td>
                        <td>CSS</td>
                        <td>9/24/24</td>
                        <td>90</td>
                    </tr>
                    <tr>
                        <td>Q3</td>
                        <td>Bootstrap & Flex</td>
                        <td>10/1/24</td>
                        <td>95</td>
                    </tr>
                    <tr>
                        <td>Q4</td>
                        <td>JavaScript & React</td>
                        <td>10/8/24</td>
                        <td>97</td>
                    </tr>
                    <tr>
                        <td>Q5</td>
                        <td>Routing</td>
                        <td>10/15/24</td>
                        <td>88</td>
                    </tr>
                    <tr>
                        <td>Q6</td>
                        <td>Node</td>
                        <td>11/5/24</td>
                        <td>79</td>
                    </tr>
                    <tr>
                        <td>Q7</td>
                        <td>Session</td>
                        <td>11/12/24</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Q8</td>
                        <td>MongoDB</td>
                        <td>11/19/24</td>
                        <td>77</td>
                    </tr>
                    <tr>
                        <td>Q9</td>
                        <td>Mongoose</td>
                        <td>11/26/24</td>
                        <td>88</td>
                    </tr>
                    <tr>
                        <td>Q10</td>
                        <td>Mongo</td>
                        <td>12/3/24</td>
                        <td>91</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3}>Average</td>
                        <td>89</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

            <h1>Labs</h1>
            <div id="wd-images">
                <h4>Image tag</h4>
                Loading an image from the internet:
                <br />
                <img id="wd-starship"
                     width="400px"
                     src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
                />
                <br />
                Loading a local image:
                <br />
                <img id="wd-teslabot" src={teslabot} height="200px" />
            </div>

            <div id="wd-forms">
                <h4>Form Elements</h4>
                <form id="wd-text-fields">
                    <h5>Text Fields</h5>
                    <label htmlFor="wd-text-fields-username">Username:</label>
                    <input id="wd-text-fields-username" placeholder="jdoe" /> <br />
                    <label htmlFor="wd-text-fields-password">Password:</label>
                    <input type="password" id="wd-text-fields-password" value="123@#$asd" />
                    <br />
                    <label htmlFor="wd-text-fields-first-name">First name:</label>
                    <input type="text" id="wd-text-fields-first-name" title="John" /> <br />
                    <label htmlFor="wd-text-fields-last-name">Last name:</label>
                    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
                           value="Wonderland" title="The last name" />
                    {/* copy rest of form elements here  */}
                </form>
            </div>

            <h5>Text boxes</h5>
            <label>Biography:</label><br/>
            <textarea id="wd-textarea" cols={30} rows={10}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
            </textarea>

            <h5 id="wd-buttons">Buttons</h5>
            <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
                Hello World!
            </button>

            <h5>File upload</h5>
            <input id="wd-upload" type="file"/>

            <div>
                <h5 id="wd-radio-buttons">Radio buttons</h5>

                <label>Favorite movie genre:</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
                <label htmlFor="wd-radio-comedy">Comedy</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-drama"/>
                <label htmlFor="wd-radio-drama">Drama</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
                <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

                <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
                <label htmlFor="wd-radio-fantasy">Fantasy</label>
            </div>

            <div>
                <h5 id="wd-checkboxes">Checkboxes</h5>
                <label>Favorite movie genre:</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
                <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
                <label htmlFor="wd-chkbox-drama">Drama</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
                <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

                <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
                <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
            </div>


            <h4 id="wd-dropdowns">Dropdowns</h4>

            <h5>Select one</h5>
            <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
            <select id="wd-select-one-genre">
                <option value="COMEDY">Comedy</option>
                <option value="DRAMA">Drama</option>
                <option selected value="SCIFI">
                    Science Fiction</option>
                <option value="FANTASY">Fantasy</option>
            </select>

            <h5>Select many</h5>
            <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
            <select id="wd-select-many-genre" multiple>
                <option selected value="COMEDY">Comedy</option>
                <option value="DRAMA">Drama</option>
                <option selected value="SCIFI">
                    Science Fiction</option>
                <option value="FANTASY">Fantasy</option>
            </select>


            <h4>Other HTML field types</h4>

            <label htmlFor="wd-text-fields-email"> Email: </label>
            <input type="email"
                   placeholder="jdoe@somewhere.com"
                   id="wd-text-fields-email"/><br/>

            <label htmlFor="wd-text-fields-salary-start"> Starting salary: </label>
            <input type="number"
                   id="wd-text-fields-salary-start"
                   placeholder="1000"
                   value="100000"/><br/>

            <label htmlFor="wd-text-fields-rating"> Rating: </label>
            <input type="range" id="wd-text-fields-rating"
                   placeholder="Doe"
                   max="5"
                   value="4"/><br/>

            <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
            <input type="date"
                   id="wd-text-fields-dob"
                   value="2000-01-21"/><br/>

            <h4>Anchor tag</h4>
            Please <a id="wd-lipsum" href="https://www.lipsum.com">click here</a>
            to get dummy text<br/>
            Please <a id="wd-lipsum" href="https://www.lipsum.com">click here</a>
            to go to the GitHub repository<br/>

        </div>

    );
}