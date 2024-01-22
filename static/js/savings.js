function getAccount() {
    let url = `${base_url}profile/get_account/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data;
        balance = parseFloat(d.balance) + parseFloat(d.coupon_balance)
        $('#acc-bal').html(digify(balance))
      }
      else if(data['status'] == 'error') {
        $('#acc-bal').html('0.00')
      }
    })
    .catch(err => {
      console.log(err);
        $('#acc-bal').html(`0.00`)
    })
  }

  getAccount()