import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Home from "../../Contexts/Home";
import Line from './Line';
import Lines from './Lines';

// const sortData = [
//     { v: 'default', t: 'Default' },
//     { v: 'price_asc', t: 'Price 1-9' },
//     { v: 'price_desc', t: 'Price 9-1' },
//     { v: 'rate_asc', t: 'Rating 1-9' },
//     { v: 'rate_desc', t: 'Rating 9-1' }
// ];

function List() {

    const { regionai, field, setRegions} = useContext(Home);

    // const [sortBy, setSortBy] = useState('default');
    const [stats, setStats] = useState({regionsCount: null});
    const [st, setSt] = useState({fieldCount: null});
    const [regFiltered, setRegFiltered] = useState([]);
    const [type, setType] = useState("0");
    const [serFiltered, setSerFiltered] = useState([]);
    const [serv, setServ] = useState("0");
    


    useEffect(() => {
        if (null === regionai) {
            return;
        }
        setStats(s => ({...s, regionsCount: regionai.length}));
    }, [regionai]);

    useEffect(() => {
        if (null === field) {
            return;
        }
        setSt(s => ({...s, fieldCount: field.length}));
    }, [field]);

    // useEffect(() => {
    //     switch (sortBy) {
    //         case 'price_asc':
    //             setRegionai(m => [...m].sort((a, b) => a[1][0].price - b[1][0].price));
    //             break;
    //         case 'price_desc':
    //             setRegionai(m => [...m].sort((b, a) => a[1][0].price - b[1][0].price));
    //             break;
    //         case 'rate_asc':
    //             setRegionai(m => [...m].sort((x, c) => x[1][0].rating - c[1][0].rating));
    //             break;
    //         case 'rate_desc':
    //             setRegionai(m => [...m].sort((jo, no) => no[1][0].rating - jo[1][0].rating));
    //             break;
    //         default:
    //             setRegionai(m => [...m ?? []].sort((a, b) => a[1][0].row - b[1][0].row));
    //     }

    // }, [sortBy, setRegionai]);

    useEffect(() => {
        if (regionai !== null) {
          setRegFiltered(regionai?.filter((el) => el.region === type));
        }
      }, [regionai, type]);

      useEffect(() => {
        if (field !== null) {
          setSerFiltered([...field]?.filter((el) => el.title === serv));
        }
      }, [field,  serv]);
    
    return (
        <>
            <div className="card m-4">
        <h5 className="card-header">Sort municipalities and services from List</h5>
        <div className="card-body">
            <div className="mb-3">
            <label className="form-label">Sort by municipalities:</label>
            <select
              className="form-select mb-4"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose municipality from list:
              </option>
              {regionai?.map((r) => (
                <option key={r.id} value={r.region}>
                  {r.region}
                </option>
              ))}
            </select>
            </div>
            <div className="mb-3">
            <label className="form-label">Sort by services:</label>
            <select
              className="form-select mb-4"
              value={serv}
              onChange={(e) => setServ(e.target.value)}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Choose services from list:
              </option>
              {field?.map((f) => (
                <option key={f.id} value={f.title}>
                  {f.title}
                </option>
              ))}
            </select>
            </div>
            </div>
          </div>
            <div className="card m-4">
                <h5 className="card-header">Lithuanian municipalities <b>({stats.regionsCount})</b> and services <b>({st.fieldCount})</b> list: </h5>
                <div className="card-body" style={{
                  display: 'flex'
                }}>
          {/* <div className="home__content__info" style={{
            width: '500px'
          }}>
            {
               regFiltered?.map((r) => <Line key={r.id} regions={r} sr={setRegions} serFiltered={serFiltered} cid={r.cid} />)
            }
          </div>    */}
          <ul className="list-group" style={{
            width: '500px'
          }}>
            {
               regFiltered?.map((r) => <Line key={r.id} regions={r} sr={setRegions} serFiltered={serFiltered} cid={r.cid} />)
            }
          </ul>
          <ul className="list-group">
                
                <div className="home">
                {
                   serFiltered?.map((f) => <div key={f.id}  fil={f} className="home__content__info">
                   {f.image2 ? <div className='img-bin'>
                      <img src={f.image2} alt={f}>
                      </img>
                  </div> : null} 
                   <h2>{f.title}</h2> 
                   {/* <Line fil={f} /> */}
              </div>
               )
                }
                </div>
                </ul>
         
          </div>
          </div>
       
        </>
    );
}

export default List;