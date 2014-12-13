if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.customimg = function()
{
	return {
		
		init: function()
		{
			var button = this.button.add('inserting-image', 'Insert Image'); //creating button
			this.button.setAwesome('inserting-image', 'fa-image'); //set fontawesom icon to the button
			this.button.addCallback(button, this.customimg.createModal); //create modal when button clicked
			
		},
		load: function()
		{
				//creating modal
			    var $modal = this.modal.getModal();
				//set tabber
				this.modal.createTabber($modal);
				this.modal.addTab(1, 'Upload Image', 'active');
				this.modal.addTab(2, 'Tab 2');
				 
				var $tabBox1 = $('<div id="upload" class="redactor-tab redactor-tab1">');
				var $tabBox2 = $('<div class="redactor-tab redactor-tab2">').hide();
				 
				$modal.append($tabBox1);
				$modal.append($tabBox2);
				$tabBox1.append(this.customimg.createTemplate());
				
		},
		createModal: function()
		{
			
				this.modal.load('image', 'Insert Image', 600);
				this.customimg.load(); //load the modal content
							
				$("a[rel='tab1']").addClass("tab1 tablink");
				$("a[rel='tab2']").addClass("tab2 tablink");
				
				$("a.tablink").on("click", function(){
					if($( "a.tab1" ).hasClass( "active" )) {
						$("#redactor-modal footer").show();
					} else {
						$("#redactor-modal footer").hide();
					}
				});
				this.customimg.createButton(); //adding control button
				this.selection.save(); //save current cursor position
				this.modal.show();
			
		},
		createTemplate: function()
		{
			
				var $meong = ''
				+ '<div class="well">'
				+ '<form id="file-form" action="" method="POST"> '
					+ '<label>Select Image</label>'
					+ '<input type="file" id="file-select" name="file" /> '
					+ '<label>Input Caption</label>'	
					+ '<input type="text" class="form-control" placeholder="input caption"  name="caption" id="caption"/>'
					+ '<br />'
				+'</form>'
				+'<div id="stats"></div>'
				+'</div>';
				return $meong;
				
				
		},
		createButton: function() 
		{
			if($( "a.tab1" ).hasClass( "active" )) {
					var action = this.modal.createActionButton('Submit');
					action.on('click', this.customimg.upload);
					this.modal.createCancelButton();
				} else {
					$("#redactor-modal footer").hide();
				}
		},
		upload: function(e)
		{
								
				var fileSelect	= document.getElementById('file-select');
				var files		= fileSelect.files;
				
				var formData	= new FormData();
				
				for (var i = 0; i < files.length; i++) {
				  var file = files[i];

				  // Check the file type.
				  if (!file.type.match('image.*')) {
					continue;
				  }

				  // Add the file to the request.
				  formData.append('file', file, file.name);
				  
				   
				}
						
				
				var other_data = $('#file-form').serializeArray();
				$.each(other_data,function(key,input){
					console.log(input.value);
					formData.append('caption', input.value);
				});
				
				
				
				
				var xhr = new XMLHttpRequest();
				xhr.open('POST', this.opts.imageHandlers, true);
				
				
				xhr.onreadystatechange = $.proxy(function()
					{
					    if (xhr.readyState == 4)
					    {
					        var data = xhr.responseText;

							data = data.replace(/^\[/, '');
							data = data.replace(/\]$/, '');
							
							this.customimg.insert(data);
					    }
					}, this);
				
				
				xhr.send(formData);
				
				
		},
		insert: function(data)
		{
				var json;
				try
				{
					json = (typeof data === 'string' ? $.parseJSON(data) : data);
				}
				catch(err)
				{
					json = {
						error: true
					};
				}


				this.progress.hide();
			
		
				$img 		= $('<img>');
				$img.attr('src', json.filelink).attr('data-redactor-inserted-image', 'true').attr('alt', json.captions);
				
				$html		= $('<div class="inner-image" />').append($img).append('<div class="caption">'+json.captions+'</div>');
				
				var node	= $html;
				var isP		= this.utils.isCurrentOrParent('P');
				
				
				if (isP)
				{
					node = $('<p />').prepend($html);
				
				}
				
				this.selection.restore();
				this.buffer.set();

				this.insert.html(this.utils.getOuterHtml(node), false);
				var $image = this.$editor.find('img[data-redactor-inserted-image=true]').removeAttr('data-redactor-inserted-image');
				if (isP)
				{
					$image.parent().contents().unwrap().wrap('<p />');
				}
				else if (this.opts.linebreaks)
				{
					$image.before('<br>').after('<br>');
				}
				this.modal.close();
		}
	};
};
