function getCourses() {
    let url = `${base_url}courses/get_courses/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.course-filter').empty()
      $('.course-filter').append(`<option selected value="">All Courses</option>`)
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <option value="${d[i].id}">
                    ${d[i].title}
                </option>`;
                $('.course-filter').append(temp)
            }
        }
        else {
            $('.course-filter').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.course-filter').append(data.message)
      }
    })
    .catch(err => {console.log(err)})
  }
  getCourses();

function getProjects() {
    let filter = ''
    let c_filter = $('.course-filter').val()
    if(!c_filter) {
        c_filter = ''
    }
    if(c_filter !== '') {
        filter = `&course_id=${c_filter}`
    }
    let url = `${base_url}projects/get_projects/?api_token=${localStorage.api_key}${filter}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.pro-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                
                var temp = `
                <tr class="q-item">
                    <td>
                    <span class="w-bold-xx h5 w-text-blue">${d[i].title}<span>
                    </td>
                    <td>${d[i].course.title}</td>
                    <td><button data-id="${d[i].id}" class="btn btn-success view-pro">View</button></td>
                    <td><button data-id="${d[i].id}" class="btn btn-danger delete-pro">Delete</button></td>
                </tr>`;
                $('.pro-row').append(temp)
            }
            $('.view-pro').click(function() {
                let id = $(this).data('id')
                $('.pro_c_con').addClass('active')
                getProject(id)
                getSubmissions(id)
            })
        }
        else {
            $('.pro-row').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.pro-row').append(data.message)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
}
getProjects();


function getProject(id) {
    let url = `${base_url}projects/get_project/?project_id=${id}&api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        $('.pro-edit-form')[0].reset();
        $('.pro-edit-form').data('id', d.id)
        
        $('#pro-title').val(d.title)
        $('#pro-des').val(d.description)
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

function getSubmissions(id) {
    let url = `${base_url}projects/get_submissions/?project_id=${id}&api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.pro-sub-row').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `
                <tr>
                <td>${d[i].student.first_name} ${d[i].student.last_name}</td>
                <td>
                <a class="w-text-red" href="${d[i].source_code}">Source code</a>&nbsp;&nbsp;
                <a class="w-text-red" href="${d[i].live_url}">Live url</a>
                </td>
                <td>
                <button class="btn btn-primary view-sub" data-id="${d[i].id}">View</button>
                </td>`;
                $('.pro-sub-row').append(temp)
            }
            $('.view-sub').click(function() {
                let cid = $(this).data('id');
                $('.sub_c_con').addClass('active')
                getSubmission(cid);
            })
        }
        else {
            var temp = `
            <tr>
            <td colspan="3">${data.message}</td>
            </tr>`;
            $('.pro-sub-row').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        var temp = `
            <tr>
            <td colspan="3">${data.message}</td>
            </tr>`;
        $('.pro-sub-row').append(temp)
      }
    })
    .catch(err => {
        console.log(err)
        swal("Error", "Please check your internet connection", "error")
    })
}

function getSubmission(id) {
    let url = `${base_url}projects/get_submission/?sub_id=${id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        d = data.data
        $('.sub-edit-form')[0].reset();
        $('.sub-edit-form').data('id', d.id)
        
        $('#sub-name').val(`${d.student.first_name} ${d.student.last_name}`)
        if(d.comment !== undefined && d.comment !== '') {
            $('#comment').val(d.comment)
        }
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

function saveProject(id) {
    const formData = new FormData();
    formData.append('description', $('#pro-des').val())
    formData.append('project_id', id)
    formData.append('api_token', localStorage.api_key)
    let url = `${base_url}projects/edit_project/`;
    $('.edit-form-btn').html(`Saving...`).attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        swal(data.status, data.message, data.status)
        $('.edit-form-btn').html(`Save Project`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.edit-form-btn').html(`Save Project`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
}

function saveSubmission(id) {
    const formData = new FormData();
    formData.append('comment', $('#comment').val())
    formData.append('sub_id', id)
    formData.append('api_token', localStorage.api_key)
    let url = `${base_url}projects/edit_submission/`;
    $('.sub-form-btn').html(`Saving...`).attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        swal(data.status, data.message, data.status)
        $('.sub-form-btn').html(`Save Submission`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.sub-form-btn').html(`Save Submission`).attr('disabled', false)
        swal("Error", "Please check your internet connection", "error")
    })
}

tinymce.init({
    selector: '.html-text',
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Admin',
    mergetags_list: [
        {value: 'First.Name', title: 'First Name'},
        {value: 'Email', title: 'Email'},
    ],
});