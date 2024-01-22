function getAccount() {
    let url = `${base_url}profile/get_account/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data;
        $('#acc-bal').html(digify(d.balance))
        $('#bon-bal').html(digify(d.coupon_balance))
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

  getAccount()