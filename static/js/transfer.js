function getBanks() {
    let url = `${base_url}banks/get_banks/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.bank-list').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <h6 style="text-align:left;" class="bank w-bold-x w-padding" data-id="${d[i].bank_code}" data-name="${d[i].bank_name}">${d[i].bank_name}</h6>`;
                $('.bank-list').append(temp)
            }
            $('.bank').click(function(e) {
                e.preventDefault();
                var code = $(this).data('id');
                var name = $(this).data('name');
                $('#bank').val(name);
                $('#bank_code').val(code);
                $('.bank_con').removeClass('active');
                verifyAccount()
            })
        }
        else {
            let temp = `
            <p class="w-text-gray">${data.message}</p>p`
            $('.bank-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `
            <p class="w-text-gray">${data.message}</p>p`
            $('.bank-list').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
  }

function verifyAccount() {
    let n = $('#acc_num').val()
    let c = $('#bank_code').val()

    if(n.length < 10 || c === '') {
        $('#verify-name').html(``)
        $('#trans_name').html('');
        $('.trans-btn').attr('disabled', true);
        return
    }
    $('#verify-name').html(`Verifying Account Details...`)
    let url = `${base_url}banks/verify_account/?account_number=${n}&bank_code=${c}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      if(data.status == 'success') {
        if(data.data) {
            $('#verify-name').html(data.data)
            $('#trans_name').html(data.data);
            $('.trans-btn').attr('disabled', false);
        }
        else {
            $('#verify-name').html(data.message)
            $('#trans_name').html('');
            $('.trans-btn').attr('disabled', true);
        }
      }
      else {
        $('#verify-name').html(data.message)
        $('#trans_name').html('');
        $('.trans-btn').attr('disabled', true);
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
}

function transferFund() {
    var url = `${base_url}transactions/transfer_fund/`;
    const formData = new FormData();
    formData.append('description', $('#description').val());
    formData.append('bank_code', $('#bank_code').val());
    formData.append('amount', $('#amount').val());
    formData.append('acc_number', $('#acc_num').val());
    formData.append('api_token', localStorage.api_key);
        
    $('.trans-btn').text('Initializing...').attr('disabled', true);

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData,
    })
    .then(response => {
        return response.json() // convert response to json
    })
    .then(data => {
        console.log(data)
        $('.trans-btn').text('Proceed To Transfer').attr('disabled', false);
    })
    .catch(err => {
        console.log(err)
        $('.trans-btn').text('Proceed To Transfer').attr('disabled', false);
        swal("Error", "Please check your internet connection", "error")
    })
}
