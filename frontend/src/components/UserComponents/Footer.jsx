import '../../styles/footer.css'

const year = new Date().getFullYear()

const Footer = () => {
  return (
    <div className='footer section__padding'>
        <div className="footer-copyright">
            <p>© Roque {year}. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer