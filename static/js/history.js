
function getTransactions() {
    let stat = $('.status-filter').val()
    let url = `${base_url}transactions/get_transactions/?api_token=${localStorage.api_key}&status=${stat}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.trans-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                let date = `${new Date(d[i].date).toDateString()} ${new Date(d[i].date).toLocaleTimeString()}`;
                let des = (d[i].description).length > 27 ? (d[i].description).slice(0,25) + "..." : (d[i].description);
                var temp = `
                <tr class="trans-det" data-id="${d[i].id}">
                    <td><span class="${d[i].icon} w-text-green w-large"></span></td>
                    <td>
                        <h5 class="w-bold">${des}</h5>
                        <span class="w-text-gray">${date}</span>
                    </td>
                    <td>
                        <h5 class="w-bold-x">N${d[i].amount}</h5>
                        <span class="w-text-green">${d[i].status}</span>
                    </td>
                </tr>`;
                $('.trans-row').append(temp)
            }
            $('.trans-det').click(function() {
                let id = $(this).data('id')
                $('.trans_det_con').addClass('active')
                getTransaction(id)
            })
        }
        else {
            let temp = `<tr>
            <td colspan="3">${data.message}</td>
            </tr>`
            $('.trans-row').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `<tr>
            <td colspan="3">${data.message}. <a class="w-text-red" onclick="getTransactions();">Click to retry</a></td>
            </tr>`
            $('.trans-row').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
  }
  getTransactions();


  function getTransaction(id) {
    let url = `${base_url}transactions/get_transaction/?trans_id=${id}&api_token=${localStorage.api_key}`;
    let con = `<div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
        </div>`
    $('.trans-detail-con').html(con)
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      $('.trans-detail-con').empty()
      console.log(data);
      if(data['status'] == 'success') {
        d = data.data
      }
      else if(data['status'] == 'error') {
        swal('Error', data.message, 'error')
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
  }

  
