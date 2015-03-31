<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>

<script type="text/javascript">
$(document).ready(function() {
	$("#submit_btn").click(function() {
		var proceed = true;
			//simple validation at client's end
			//loop through each field and we simply change border color to red for invalid fields
		$("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
			$(this).css('border-color','');
			if (!$.trim($(this).val())) { //if this field is empty
				$(this).css('border-color','red'); //change border color to red
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if ($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))) {
				$(this).css('background','red');
				proceed = false; //set do not proceed flag
			}
		});

		if (proceed) {
		 	//data to be sent to server
			var m_data = new FormData();
			m_data.append( 'user_name', $('input[name=name]').val());
			m_data.append( 'year', $('input[name=year]').val());
			m_data.append( 'industry', $('input[name=industry]').val());
			m_data.append( 'owner', $('input[name=owner]').val());
			m_data.append( 'user_email', $('input[name=email]').val());
			m_data.append( 'message', $('textarea[name=message]').val());
			m_data.append( 'messagetwo', $('select[name=messagetwo]').val());
			m_data.append( 'file_attach', $('input[name=file_attach]')[0].files[0]);

			$.ajax({
				url: 'mail/contact_me.php',
				data: m_data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				success: function(response){
				 //load json data from server and output message
					if (response.type == 'error') { //load json data from server and output message
						output = '<div class="error">'+response.text+'</div>';
					}else{
						output = '<div class="success">'+response.text+'</div>';
					}
					$("#contact_form #contact_results").hide().html(output).slideDown();
				}
			});
		}
	});

	//reset previously set border colors and hide all message on .keyup()
	$("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
			$(this).css('border-color','');
			$("#result").slideUp();
	});
});

function inputChange(){
	if ($('.add_logo[type="file"]').val() != "") {
		$(".add_logo").parent().addClass("active");
	};
}
</script>

<div class="form-style row" id="contact_form">
		<div id="contact_results"></div>
		<div id="contact_body">
				<label class="grid-full">
						<input type="text" name="name" id="name" placeholder="Company Name" required="true" class="input-field"/>
				</label>
				<label class="grid-half">
						<input type="text" name="year" id="year" placeholder="Year founded" required="true" class="input-field"/>
				</label>
				<label class="grid-half">
						<input type="text" name="industry" id="industry" placeholder="Industry" required="true" class="input-field"/>
				</label>
				<label class="grid-full">
						<input type="text" name="owner" id="owner" placeholder="Owner/Principle Name(s)" required="true" class="input-field"/>
				</label>
				<label class="grid-full">
						<input type="email" name="email" placeholder="Contact Email" required="true" class="input-field"/>
				</label>
				<label class="grid-full" for="field5">
						<textarea name="message" id="message" placeholder="Mission Statment (500 Word Max)" class="textarea-field" maxlength="50-" required="true"></textarea>
				</label>
				<label class="grid-full" for="field5">
						<textarea name="messagetwo" id="messagetwo" placeholder="Company product or service" class="textarea-field" required="true"></textarea>
				</label>
				<label class="grid-half">
						<input style="display:none;" type="file" onchange="inputChange();" name="file_attach" class="input-field add_logo" /><span class="fa fa-arrow-circle-o-up"></span><span>Upload logo</span>
				</label>
				<label class="grid-half">
						<input type="submit" id="submit_btn" value="Submit" />
				</label>
		</div>
</div>
