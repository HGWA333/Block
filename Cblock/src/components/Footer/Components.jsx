import { FooterCSS } from "../../styleCSS/FooterCSS";
const FooterComponents = () => {
  return (
    <>
      <FooterCSS>
        <div className="footerBox1">
          <div>
            <div>Icon1</div>
            <div>Icon1</div>
          </div>
          <div>
            <div>Icon1</div>
            <div>Back to Top</div>
          </div>
        </div>
        <div className="footerBox2">
          <div className="footerItem001">
            <div>Powered by Ethereum</div>
            <div>
              Etherscan is a Block Explorer and Analytics Platform for Ethereum,
              <br />a decentralized smart contracts platform.
            </div>
          </div>
          <div className="footerItem002">
            <div>
              <div>Company</div>
              <div>About Us</div>
              <div>Brand Assets</div>
              <div>Contact Us</div>
              <div>Careers We're Hiring!</div>
              <div>Terms of Service</div>
              <div>Bug Bounty</div>
            </div>
            <div>
              <div>Community</div>
              <div>API Documentation</div>
              <div>Knowledge Base</div>
              <div>Network Status</div>
              <div>Newsletters</div>
              <div>Disqus Comments</div>
            </div>
            <div>
              <div>Products & Services</div>
              <div>Advertise</div>
              <div>Explorer-as-a-Service (EaaS)</div>
              <div>API Plans</div>
              <div>Priority Support</div>
              <div>Blockscan </div>
              <div>Blockscan Chat </div>
            </div>
          </div>
        </div>
      </FooterCSS>
    </>
  );
};

export default FooterComponents;
