const Footer=()=>{
    return(
        <>
            <footer>
                            <div className="left-footer">
                                   <ul>
                                          <li>Quick Links</li>
                                          <li><a href="#">Home</a></li>
                                          <li><a href="#">Features</a></li>
                                          <li><a href="#">How It Works</a></li>
                                          <li><a href="#">Contact Us</a></li>
                                          <li><a href="#">About Us</a></li>
                                   </ul>
                            </div>
                            <div className="right-footer">
                                   <div className="basic">
                                          <img src="./src/assets/call.png" alt="" />
                                          <li>Contact information</li>
                                   </div>
                                   <div className="information">
                                          <li>Email: support@educhain.com</li>
                                          <li>Phone: +91 7499518568</li>
                                          <li>Address: University Skill Exchange, KIT Campus, Kolhapur, India</li>
                                          <li>Follow Us: </li>
                                                 <div className="follow">
                                                        <li>Facebook<img src="./src/assets/facebook.png" alt="" /> | </li>
                                                        <li>Twitter<img src="./src/assets/twitter.png" alt="" /> | </li>
                                                        <li>Instagram<img src="./src/assets/insta.png" alt="" /> | </li>
                                                        <li>LinkedIn <img src="./src/assets/linkedIn.png" alt="" /></li>
                                                 </div>
                                   </div>
                            </div>
                     </footer>
        </>
    );
}

export default Footer;