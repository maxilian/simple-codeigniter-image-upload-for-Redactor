simple codeigniter image upload for Redactor [![Buy me a coffee](http://files.nette.org/images/coffee1s.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=VAFHFTVQVW6MQ&lc=ID&item_name=panicscript&currency_code=USD&bn=PP%2dDonationsBF%3acoffee1s%2epng%3aNonHosted)
============================================

Recently I working on a web application that needed to upload image within editor field, not a separated upload. 
So i found the solution by using Redactor from imperavi.

This is simple image uploader to integrated with Imperavi Redactor, but i have not finished yet create the plugin, 
so currently I only upload the controller which will handle upload process.

===========================================

I have upload it, under name of customimg.js, my code isn't clean enough I hope you understand how I written the code.

what's new?
- this plugin isn't use default upload using drop file method, so we must select the file manually
- this plugin isn't automatic upload, I use submit button to confirm the upload.
- adding caption field for the image by some reason :p

===========================================

How to use it.

- add script to your editor page

```
<script src="http://url.to/customimg.js"></script>
```

- initilize the plugin to redactor init script

```
$('#content').redactor({
  plugins: ['customimg'],
});
```

- add custom options to your image upload controllers

```
$('#content').redactor({
  plugins: ['customimg'],
  imageHandlers: './directory_to/image_upload',
});
```

- And voila, the plugin ready to use

============================================

Note : I'm not adding error handling so you should figure it out by yourself

============================================


For more documentation about redactor plugin and API's, you can go to http://imperavi.com/redactor/docs/
Redactor is propietary software, so don't forget to purchase :)

Hope you enjoy with my plugin.
Visit my site for more cool stuff http://panicscript.com
