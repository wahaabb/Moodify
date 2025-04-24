import React from 'react'
import '../../SCSS/Components/_footer.scss'
export default function LowerFooter() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Moodify. All rights reserved by  <a style={{  color: "white"}}  href="https://portfolio911.surge.sh/">ABDUL WAHAB</a>.</p>
    </footer>
  )
}
