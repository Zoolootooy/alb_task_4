<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuejs-datepicker"></script>




<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery.maskedinput@1.4.1/src/jquery.maskedinput.min.js"
        type="text/javascript"></script>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"-->
<!--        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"-->
<!--        crossorigin="anonymous"></script>-->
<!--<script src="public/js/mask.js"></script>-->

<!--<script src="https://unpkg.com/vue-the-mask@0.11.1/dist/vue-the-mask.js"></script>-->

<script src="public/js/map.show.js"></script>
<?php
$mapScriptSrc = "https://maps.googleapis.com/maps/api/js?key=" . $map_config['map_api'] . "&callback=initMap";
?>
<script src=<?php echo $mapScriptSrc ?> async defer></script>


<script src="https://cdn.rawgit.com/RobinHerbots/Inputmask/3.2.7/dist/min/jquery.inputmask.bundle.min.js" type="text/javascript"></script>
<script src="https://cdn.rawgit.com/andr-04/inputmask-multi/1.2.0/js/jquery.inputmask-multi.min.js" type="text/javascript"></script>
<!--<script src="public/js/mask.js"></script>-->
</body>
</html>