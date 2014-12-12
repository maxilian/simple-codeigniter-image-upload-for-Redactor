<?php 
class Redactor extends CI_Controller {

	public function image_upload()
        {
                if(!empty($_FILES['file']['name']))
                {

                        $config['upload_path'] = 'your_image_directories_relative_path';
                        $config['allowed_types'] = 'gif|jpg|png';

                        $this->load->library('upload', $config);

                        if($this->upload->do_upload('file'))
                        {
                                $image_data = $this->upload->data();

                                $json = array(
                                    'filelink' => 'http://your.image.url/'.$image_data["file_name"],
                                    'captions' => $_POST['caption']
                                );

                                echo stripslashes(json_encode($json));
                        }
                }
        }
     

}
?>
