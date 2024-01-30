// public/js/app.js

document.addEventListener('DOMContentLoaded', async () => {
  const actionForm = document.getElementById('actionForm');
  const dataContainer = document.getElementById('data-container');

  actionForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const actionSelect = document.getElementById('actionSelect');
      const quota_id = document.getElementById('quota_id');
      const person_id = document.getElementById('person_id'); // Convert input to integer
      const absence_type = document.getElementById('absence_type');
      const sub_absence_type = document.getElementById('sub_absence_type');
      const start_date = document.getElementById('start_date');
      const end_date = document.getElementById('end_date');



      let endpoint = '';
      let method = '';

      switch (actionSelect.value) {
          case 'getDataAll':
              endpoint = '/api/data';
              method = 'GET';
              break;
          case 'getDataById':
              endpoint = `/api/data/${quota_id.value}`;
              method = 'GET';
              break;
          case 'createData':
              endpoint = '/api/data';
              method = 'POST';
              break;
          case 'updateData':
              endpoint = `/api/data/${person_id.value}`;
              method = 'PUT';
              break;
          case 'deleteData':
              endpoint = `/api/data/${person_id.value}`;
              method = 'DELETE';
              break;
          default:
              console.error('Invalid action');
              return;
      }

      try {
          let response;
          if (method === 'GET') {
              response = await fetch(`http://localhost:3001${endpoint}`);
          } else {
              response = await fetch(`http://localhost:3001${endpoint}`, {
                  method: method,
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: method === 'POST' || method === 'PUT' 
                    ? JSON.stringify({ 
                        person_id: person_id.value,
                        absence_type: absence_type.value,
                        sub_absence_type: sub_absence_type.value,
                        start_date: start_date.value,
                        end_date: end_date.value,
                    }) : null,
              });
          }

          const result = await response.json();

          // Display result in the container
          dataContainer.innerHTML = `<p><strong>Action Result:</strong> ${JSON.stringify(result)}</p>`;
      } catch (error) {
          console.error('Error:', error.message);
      }
  });
});
