import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biography</p>
         <h3>Who we are</h3>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, dolorum, quasi odit, reiciendis unde voluptas
             voluptatibus qui ad asperiores cupiditate incidunt tenetur dignissimos veniam fuga. Alias quod, error dicta labore obcaecati 
             at perspiciatis doloribus laborum doloremque molestias culpa praesentium nihil esse mollitia modi nostrum distinctio ipsam eaque
              minus sit aspernatur.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum perspiciatis officiis accusamus vel quisquam nesciunt! Harum commod
            i dolore labore mollitia unde numquam similique consectetur omnis quae eum. Quisquam, natus porro! Inventore explicabo alias nesciunt cupiditate.</p>

      </div>
    </div>
  )
}

export default Biography
