import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'                                       
class Footer extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="wrapper">
                    <div className="footerContainer">
                        <ul className="socialIcons bottom">
                            <li><a href="https://github.com/Naveen2905"><FontAwesomeIcon icon={faGithub} /></a>
                            </li>
                            <li><a href="https://www.linkedin.com/in/naveenmalhotra2905/"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            </li>
                            <li><a href="https://twitter.com/naveencodes"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

export default Footer