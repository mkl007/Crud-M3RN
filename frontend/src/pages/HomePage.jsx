import { useAuth } from '../context/AuthContext'

export const HomePage = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className='container' style={{ marginTop: "15px" }}>

      <div className="row">
        <h3>HomePage</h3>
        {isAuthenticated ? (
          <div>
            <strong><p><b>Esta es la pagina para los que estan autenticados</b></p></strong>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
          </div>
        ) : (
          <div>
            <button>Register</button>
            <button>login</button>
            <strong><p><b>Esta es la pagina para los que no estan autenticados</b></p></strong>

            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Esse officia similique unde ab sapiente ducimus voluptatum dolore,
              ratione aperiam, hic minima iusto repellat eius nulla a exercitationem commodi alias saepe!</p>
          </div>
        )}
      </div>
    </div>
  )
}