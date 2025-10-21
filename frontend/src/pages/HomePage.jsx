import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const HomePage=()=>{
       return(
              <>
                     <Navbar/>
                     <h2>Connect. Learn. Share Your Skills on Campus</h2>
                     <section className="hero">
                            <div className="text">
                                   <div className="main-text">
                                          <p>
                                          University Skill Exchange is a platform that enables students within the same campus to share, learn, and collaborate on various skills. Students can create profiles, showcase their expertise, discover peers with complementary skills, and engage in collaborative learning, fostering a vibrant campus community and enhancing practical knowledge beyond the classroom.
                                   </p>
                                   </div>
                                   <div className="btn">
                                          <button>
                                          <a href="#">
                                                 Explore More
                                                 <span>
                                                        <img src="./src/assets/arrow2.png" alt="" />
                                                 </span>
                                          </a>
                                   </button>
                                   </div>
                            </div>
                            <div className="images">
                                          <div class="div1">
                                                 <img src="./src/assets/Coddingg.png" alt="" />
                                          </div>
                                          <div class="div2">
                                                 <img src="./src/assets/Presentation.png" alt="" />
                                          </div>
                                          <div class="div3">
                                                 <img src="./src/assets/ARVR.png" alt="" />
                                          </div>
                                          <div class="div4">
                                                 <img src="./src/assets/ML.png" alt="" />
                                          </div>
                            </div>
                     </section>
                     <section className="features">
                            <h2>Features</h2>
                            <div className="corousal">
                                   <div className="div5">
                                          <img src="./src/assets/p2p.png" alt="" />
                                          <div className="overlay-text">
                                                 <p>Peer-to-Peer Learning</p>
                                          </div>
                                   </div>
                                   <div className="div6">
                                          <img src="./src/assets/Community driven.png" alt="" />
                                          <div className="overlay-text">
                                                 <p>Community Driven</p>
                                          </div>
                                   </div>
                                   <div className="div7">
                                           <img src="./src/assets/personalised Learning path.png" alt="" />
                                          <div className="overlay-text">
                                                 <p>Personalized Learning</p>
                                          </div>
                                   </div>
                                   <div className="div8">
                                           <img src="./src/assets/p2p.png" alt="" />
                                          <div className="overlay-text">
                                                 <p>Peer-to-Peer Learning</p>
                                          </div>
                                   </div>
                            </div>
                     </section>
                     <section className="HowItWorks">
                          <h2>How It Works</h2>
                          <div className="container">
                            <div className="left-side">
                                   <h4>Steps</h4>
                                   <ul>
                                          <li>Register Yourself</li>
                                          <li>Browse and Search</li>
                                          <li>Connect and Collaborate</li>
                                          <li>Learn and Feedback</li>

                                   </ul>
                                   <div className="join">
                                          <button>
                                                 <a href="#">Get Started</a>
                                          </button>
                                   </div>
                            </div>
                           <div className="right-side">
                                   <div className="circle-container">
                                          <div className="circle1"></div>
                                          <p>Skill Sharing</p>
                                   </div>
                                   <div className="circle-container">
                                          <div className="circle2"></div>
                                          <p>Peer Learning</p>
                                   </div>
                                   <div className="circle-container">
                                          <div className="circle3"></div>
                                          <p>Collaboration</p>
                                   </div>
                                   <div className="circle-container">
                                          <div className="circle4"></div>
                                          <p>Innovation</p>
                                   </div>
                                   </div>
                            </div>
                     </section>
                     <Footer/>
              </>
       );
}

export default HomePage;