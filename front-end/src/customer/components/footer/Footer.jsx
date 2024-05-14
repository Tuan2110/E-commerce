import React from "react";
import footerLogo from "../../../assets/logo.png";
import Banner from "../../../assets/website/footer-pattern.jpg";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const BannerImg = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
};

const FooterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/#about",
    },
    {
        title: "Contact",
        link: "/#contact",
    },
    {
        title: "Blog",
        link: "/#blog",
    },
];

const Footer = () => {
    return (
        <div style={BannerImg} className="text-white">
            <div className="container">
                <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
                    {/* company details */}
                    <div className="py-8 px-4">
                        <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                            <img src={footerLogo} alt="" className="max-w-[50px]" />
                            TuanShop
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
                            beatae ea recusandae blanditiis veritatis.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                    <div className="py-8 px-4">
                            <h1 className="text-xl font-bold text-left mb-3">
                                Important Links
                            </h1>
                            <ul className="flex flex-col gap-3">
                                {FooterLinks.map((link) => (
                                    <li
                                        className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 text-left"
                                        key={link.title}
                                    >
                                        <span>{link.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="py-8 px-4">
                            <h1 className="text-xl font-bold text-left mb-3">
                                Links
                            </h1>
                            <ul className="flex flex-col gap-3">
                                {FooterLinks.map((link) => (
                                    <li
                                        className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 text-left"
                                        key={link.title}
                                    >
                                        <span>{link.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* social links */}

                        <div>
                            <div className="flex items-center gap-3 mt-6">
                                <a href="#">
                                    <InstagramIcon className="text-3xl" />
                                </a>
                                <a href="#">
                                    <FacebookIcon className="text-3xl" />
                                </a>
                                <a href="#">
                                    <LinkedInIcon className="text-3xl" />
                                </a>
                            </div>
                            <div className="mt-6">
                                <div className="flex items-center gap-3">
                                    <LocationOnIcon />
                                    <p>HCM, Viet Nam</p>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <LocalPhoneIcon />
                                    <p>+338995848</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
