// For Admin
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
        $('.acc-bal2').html(digify(d.balance))
        $('.bon-bal2').html(digify(d.coupon_balance))
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

  function getData() {
    let url = `${base_url}transactions/get_data/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('#data-select').empty()
      $('#data-select').append(`<option selected disabled>Select Data Bundle</option>`)
      if(data['status'] == 'success') {
        d = data.data;
        for(var i in d) {
          var temp = `<option class="data-option" data-id="${d[i].amount}" data-name="${d[i].network}" value="${d[i].code}">${d[i].network} ${d[i].description} ${d[i].type} = N${d[i].amount}</option>`;
          $('#data-select').append(temp)
        }
        $('.data-option').hide();
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  getData()

  //getTotalUsers()

  function buyAirtime() {
    let url = `${base_url}transactions/buy_airtime/`;
    const formData = new FormData()

    if($('#provider').val() === '') {
      swal("Error", "Kindly select a network provider", 'error')
      return
    }
    formData.append('phone', $('#airtime-phone').val());
    formData.append('provider', $('#provider').val());
    formData.append('amount', $('#airtime-amount').val());
    formData.append('payment', $('#payment').val());
    formData.append('api_token', localStorage.api_key)


    $('#airtime-btn').html(`Processing...<i class="fa fa-refresh"></i>`).attr('disabled', true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        swal('Success', "Transaction Successful", 'success')
        $('.airtime-form')[0].reset()
        $('.provider').removeClass('active');
        $('.mark').hide();
        $('#provider').val('')
        getAccount()
        $('.note-header').html(`<i class="fa fa-mobile"></i> Airtime`);
        $('.note-body').html(`N${data['amount']} ${data['provider']} Airtime for ${data['phone']}`);
        $('.notification').addClass('active');
        setTimeout(function() {
          $('.notification').removeClass('active')
        }, 3000);
      }
      else if(data['status'] == 'error') {
        swal("Error", data['message'], 'error')
      }
      $('#airtime-btn').html(`Buy Airtime`).attr('disabled', false)
    })
    .catch(err => {
      console.log(err);
      swal("Error", 'check your internet connection', 'error')
      $('#airtime-btn').html(`Buy Airtime`).attr('disabled', false)
    })
  }

  function buyData() {
    let url = `${base_url}transactions/buy_data/`;
    const formData = new FormData()

    if($('#provider2').val() === '') {
      swal("Error", "Kindly select a network provider", 'error')
      return
    }
    formData.append('phone', $('#data-phone').val());
    formData.append('code', $('#data-select').val());
    formData.append('payment', $('#payment2').val());
    formData.append('api_token', localStorage.api_key)


    $('#data-btn').html(`Processing...<i class="fa fa-refresh"></i>`).attr('disabled', true)
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        swal('Success', "Transaction Successful", 'success')
        $('.data-form')[0].reset()
        $('.provider').removeClass('active');
        $('.mark').hide();
        getAccount()
        $('.note-header').html(`<i class="fa fa-wifi"></i> Data Bundle`);
        $('.note-body').html(`${data.data.description} ${data.data.network} Data for ${data['phone']}`);
        $('.notification').addClass('active');
        setTimeout(function() {
          $('.notification').removeClass('active')
        }, 3000);
      }
      else if(data['status'] == 'error') {
        swal("Error", data['message'], 'error')
      }
      $('#data-btn').html(`Buy Data`).attr('disabled', false)
    })
    .catch(err => {
      console.log(err);
      swal("Error", 'check your internet connection', 'error')
      $('#data-btn').html(`Buy Data`).attr('disabled', false)
    })
  }
