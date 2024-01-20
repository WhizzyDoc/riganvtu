function getProfile() {
    let url = `${base_url}profile/get_profile/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.monn-acc').empty()
      if(data['status'] == 'success') {
        d = data.data;
        $('#fund-name').val((`${d.first_name} ${d.last_name}`))
        $('#fund-email').val(d.email)
        $('#trans-name').val(`${data.accounts[0].account_name}`)

        for(var i in data.accounts) {
            a = data.accounts;
            var temp = `<div class="field">
            <label for="opay">${a[i].bank_name}</label>
              <input type="number" class="form-control" value="${a[i].account_number}" readonly>
              <div class="icons copy-icon">Copy</div>
          </div>`;
          $('.monn-acc').append(temp)
        }
        
      }
      else if(data['status'] == 'error') {
        swal('Error', 'Error occured', 'error')
      }
    })
    .catch(err => {
      console.log(err);
      swal('Error', 'Check your internet connection', 'error')
    })
}
getProfile()

function getMonnifyAccount() {
    let url = `${base_url}profile/get_account/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      if(data['status'] == 'success') {
        d = data.data;
        $('#acc-bal').html((d.balance).toLocaleString())
        $('#bon-bal').html(d.coupon_balance)
      }
      else if(data['status'] == 'error') {
        var temp = `<small onclick="getAccount();">Error occured. Tap to retry</small>`
        $('#acc-bal').html(temp)
        $('#bon-bal').html(`0.00`)
      }
    })
    .catch(err => {
      console.log(err);
      var temp = `<small onclick="getAccount();">Check your internet connection. Tap to retry</small>`
        $('#acc-bal').html(temp)
        $('#bon-bal').html(`0.00`)
    })
  }


  getMonnifyAccount()