import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './LandPage.module.css'

function LandingPage(){
    return(
        <>
        <section>
            <div className={Styles.Earth}></div>
            <div className={Styles.circle}>
                <span Style="--i:1;">W</span>
                <span Style="--i:2;">e</span>
                <span Style="--i:3;">l</span>
                <span Style="--i:4;">c</span>
                <span Style="--i:5;">o</span>
                <span Style="--i:6;">m</span>
                <span Style="--i:7;">e</span>
                <span Style="--i:8;">-</span>
                <span Style="--i:9;">t</span>
                <span Style="--i:10;">o</span>
                <span Style="--i:11;">-</span>
                <span Style="--i:12;">t</span>
                <span Style="--i:13;">h</span>
                <span Style="--i:14;">e</span>
                <span Style="--i:15;">-</span>
                <span Style="--i:16;">C</span>
                <span Style="--i:17;">o</span>
                <span Style="--i:18;">u</span>
                <span Style="--i:19;">n</span>
                <span Style="--i:20;">t</span>
                <span Style="--i:21;">r</span>
                <span Style="--i:22;">i</span>
                <span Style="--i:23;">e</span>
                <span Style="--i:24;">s</span>
                <span Style="--i:25;">-</span>
                <span Style="--i:26;">f</span>
                <span Style="--i:27;">r</span>
                <span Style="--i:28;">o</span>
                <span Style="--i:29;">m</span>
                <span Style="--i:30;">-</span>
                <span Style="--i:31;">E</span>
                <span Style="--i:32;">a</span>
                <span Style="--i:33;">r</span>
                <span Style="--i:34;">t</span>
                <span Style="--i:35;">h</span>
                <span Style="--i:36;">-</span>
                <span Style="--i:37;">P</span>
                <span Style="--i:38;">l</span>
                <span Style="--i:39;">a</span>
                <span Style="--i:40;">n</span>
                <span Style="--i:41;">e</span>
                <span Style="--i:42;">t</span>
                <span Style="--i:43;">-</span>
            </div>
            
        </section>
        <div className={Styles.sectButon}>
            <Link to='/home'> {/* Pasos para la creacion de un boton */}
                <button className={Styles.btn}>Welcome to Countries</button>
                
            </Link>
        </div>
        </>
    )
}

export default LandingPage;