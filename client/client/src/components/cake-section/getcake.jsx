import  { useEffect, useState } from 'react';

const DecorationList = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://binge-be.onrender.com/getcakes', {
          headers: {
            // Your headers here if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCakes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (cakeId) => {
    try {
      const response = await fetch(`https://binge-be.onrender.com/cakes/${cakeId}`, {
        method: 'DELETE',
        headers: {
          // Your headers here if needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cake');
      }

      // Filter out the deleted cake from the state
      setCakes((prevCakes) => prevCakes.filter((cake) => cake._id !== cakeId));
    } catch (error) {
      console.error('Error deleting cake:', error);
      setError('Error deleting cake. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Cake List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {cakes.map((cake) => (
            <li style={{ width: '20%', height: '30%' }} key={cake._id}>
              <img style={{ width: '100%', height: '100%' }} src={`data:image/jpeg;base64,${cake.image}`} alt={cake.cakeName} />
              <p>{cake.cakeName}</p>
              <p>Price: ${cake.price}</p>
              <button onClick={() => handleDelete(cake._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DecorationList;
