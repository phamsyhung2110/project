import '../css/Header.css'


function Header () {
  return (
    <ul className='navbar'>
        <li className="nav-item">
            Wheather
            <div className="ping">

            </div>
        </li>
        <li className="nav-item">Alert</li>
        <li className="nav-item">News</li>
    </ul>
  )
}

export default Header