(function($){
// definición de la función
 		var meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
		var cdxm = 	[31,28,31,30,31,30,31,31,30,31,30,31];
		var min_diferencia_dias = 7;
		min_diferencia_dias = min_diferencia_dias+1;
		var actual_abierto = "";
		var ruta_one = ".inputtime .newimputdate";
		var ruta_two = ".inputdate .controls .mes #mon";
		var rutc = ".controls";
		var rutd = ".inputtime .controls .uso #use";
		var ture = ".inputdate .controls ";
		var rutf = ".inputdate .newimputdate";
		var ra = '.inputdate';
		var rn = ".minuto #min";
		var rc = ".minuto .data";
		var rd = ".uso .data";
		var re = ".inputtime";
		var rf = ".uso #use";
		var ri = ".newimputdate";
		var ro = ".hora #hour";
		var ru = ".hora .data";
		var rz = ".newimputdate ";
		$.fn.davpick_get = function(options){
			var tipo = $(this).find("div:first-child").attr("class");
			if(tipo == "inputdate"){
				var opday =	parseInt($(this).find(".controls .dia #day").val());
				var opmes =	parseInt($(this).find(".controls .mes #mon").val());
				var opanno = parseInt($(this).find(".controls .ano #year").val());
				if(opday < 10){
					opday = "0"+opday;
				}
				if(opmes < 10){
					opmes = "0"+opmes;
				}
				if(opanno < 10){
					opanno = "0"+opanno;
				}
				return opanno+"-"+opmes+"-"+opday;
			}else if(tipo == "inputtime"){
				var total_hora = actual_hora;
				var actual_hora = parseInt($(this).find('.controls .hora #hour').val());
				if($(this).find('.controls .uso #use').val() == "2"){
					total_hora = actual_hora+12;
					if(actual_hora == 12){
						total_hora = 12;
					}
				}else{
					if(actual_hora == 12){
						total_hora = 0;
					}
				}
				if(total_hora < 10){
					total_hora = "0"+total_hora;
				}
				return total_hora + ":"+ $(this).find('.controls .minuto .data').html()+":00";
			}
		}
		$.fn.davpick_set= function(options){
			this.each(function(){
				var opts = $.extend($.fn.davpick.defaults, options);		
				var tipo = $(this).find("div:first-child").attr("class");
				if(tipo == "inputdate"){
					var mdate = opts. min_date;
						if(mdate == "null"){
							$(this).find(rutf).attr("my","null");
							$(this).find(rutf).attr("mm","0");
							$(this).find(rutf).attr("md","0");
						}else if(mdate != null){
							try{
								mdate = mdate.split("-");
								$(this).find(rutf).attr("my",mdate[0]);
								$(this).find(rutf).attr("mm",mdate[1]);
								$(this).find(rutf).attr("md",mdate[2]);
							}catch(e){

							}
						}
					var xdate = opts. max_date;
						if(xdate == "null"){
							$(this).find(rutf).attr("my","null");
							$(this).find(rutf).attr("mm","0");
							$(this).find(rutf).attr("md","0");
						}else if(xdate != null){
							try{
								xdate = xdate.split("-");
								$(this).find(rutf).attr("xy",xdate[0]);
								$(this).find(rutf).attr("xm",xdate[1]);
								$(this).find(rutf).attr("xd",xdate[2]);
							}catch(e){

							}
						}
					var cdate = opts. current_date;
						if(cdate != null){
							try{
								cdate = cdate.split("-");
								var actual_day = parseInt(cdate[2]);
								var actual_month = parseInt(cdate[1]);
								var actual_year = parseInt(cdate[0]);
								$(this).find(".inputdate .newimputdate .dia").html(actual_day);
								$(this).find(".inputdate .newimputdate .mes").html(meses[actual_month-1]);
								$(this).find(".inputdate .newimputdate .aao").html(actual_year);
								$(this).find(ruta_two).val(actual_month);
								$(this).find(ture+".mes .data").html(meses[actual_month-1]);
								$(this).find(ture+".ano #year").val(actual_year);
								$(this).find(ture+".ano .data").html(actual_year);
								$(this).find(ture+".dia #day").val(actual_day);
								$(this).find(ture+".dia .data").html(actual_day);
							}catch(e){

							}
						}
				}else if(tipo == "inputtime"){
					var mtime = opts. min_time;
						if(mtime == "null"){
							$(this).find(ruta_one).attr("mh","null");
							$(this).find(ruta_one).attr("mm","0");
						}else if(mtime != null){
							try{
								mtime = mtime.split(":");
									var intervalo_a = parseInt($(this).find(re).attr("in"));
									var mini_m = parseInt(mtime[1]);
									if (mini_m % intervalo_a) {
									   	if (0 > mini_m) {
									        return Math.ceil(mini_m / intervalo_a) * intervalo_a;
									    }
									    mini_m = Math.ceil(mini_m / intervalo_a) * intervalo_a;
									}
								$(this).find(ruta_one).attr("mh",mtime[0]);
								$(this).find(ruta_one).attr("mm",mini_m);
							}catch(e){

							}
						}
					var xtime = opts. max_time;
						if(xtime == "null"){
							$(this).find(ruta_one).attr("xh","null");
							$(this).find(ruta_one).attr("xm","0");
						}else if(xtime != null){
							try{
								xtime = xtime.split(":");
									var intervalo_b = parseInt($(this).find(re).attr("in"));
									var maxi_m= parseInt(xtime[1]);
									if (maxi_m % intervalo_b) {
									   	if (0 > mini_m) {
									        return Math.ceil(maxi_m / intervalo_b) * intervalo_b;
									    }
									    maxi_m = Math.floor(maxi_m / intervalo_b) * intervalo_b;
									}
								$(this).find(ruta_one).attr("xh",xtime[0]);
								$(this).find(ruta_one).attr("xm",maxi_m);
							}catch(e){

							}
						}
					var intervalo = options. intervalo;
						if((typeof intervalo != "undefined") && (intervalo != null)){
							try{
								var intervalo_c = parseInt(opts. intervalo);
									if(intervalo_c >= 25){
										intervalo_c = 30;
									}else if(intervalo_c < 1){
										intervalo_c = 1;
									}else if((intervalo_c > 6) && (intervalo_c < 25)){
										var multiplos = [6, 10, 10, 10, 12, 12, 12, 15, 15, 15, 15, 20,20,20,20,20,20,20];
										intervalo_c = multiplos[intervalo-7]
									}
								var optmin_hour = $(this).find(ruta_one).attr("mh");
									var mini_m = parseInt($(this).find(ruta_one).attr("mm"));
									if(optmin_hour != "null"){
										if (mini_m % intervalo_c) {
										   	if (0 > mini_m) {
										        mini_m = Math.ceil(mini_m / intervalo_c) * intervalo_c;
										    }
										    mini_m = Math.ceil(mini_m / intervalo_c) * intervalo_c;
										    $(this).find(ruta_one).attr("mm",mini_m);
										}
									}
								var optmax_hour = (this).find(ruta_one).attr("xh");
									var maxi_m = parseInt($(this).find(ruta_one).attr("xm"));
									if(optmax_hour != "null"){
										if (maxi_m % intervalo_c) {
										   	if (0 > maxi_m) {
										        maxi_m = Math.ceil(maxi_m / intervalo_c) * intervalo_c;
										    }
										    maxi_m = Math.floor(maxi_m / intervalo_c) * intervalo_c;
										    $(this).find(ruta_one).attr("xm",maxi_m);
										}
									}
								$(this).find(re).attr("in",intervalo_c);
								$(this).davpick_set({current_time: $(this).davpick_get() });
							}catch(e){

							}
						}
					var ctime = opts. current_time;
						if(ctime != null){
							try{
								ctime = ctime.split(":");
								var actual_hora = parseInt(ctime[0]);
								var actual_hora_txt = "";
								var total_hora = actual_hora;
								var actual_minuto = parseInt(ctime[1]);
								var inter = parseInt($(this).find(re).attr("in"));
								if (actual_minuto % inter) {
									if (0 > actual_minuto) {
										actual_minuto = Math.ceil(actual_minuto / inter) * inter;
									}
									actual_minuto = Math.floor(actual_minuto / inter) * inter;
								}
								var setetime = false;
								var mh = $(this).find(ruta_one).attr("mh");
								var hora_data = "";
								var minuto_data = "";
								var uso_data = "";
								if(mh != "null"){
									mh = parseInt(mh);
									var mmnb = parseInt($(this).find(ruta_one).attr("mm"));
									var mhb = (mh * 60)+mmnb;
									var suth = (total_hora*60)+actual_minuto;
									
									if(suth < mhb){
										//current pick time is smaller than min time parameter
										if(mh > 12){
											$(this).find(rutd).val(2);
											$(this).find(".inputtime .controls .uso .data").html("PM");
											uso_data = "PM";
											mh = mh - 12;
										}else{
											$(this).find(rutd).val(1);
											$(this).find(".inputtime .controls .uso .data").html("AM");
											uso_data = "AM";
										}
										total_hora = mh;
										if(mmnb < 10){
											mmnb = "0"+mmnb;
										}
										$(this).find(".inputtime .controls .hora #hour").val(mh);
										$(this).find(".inputtime .controls .hora .data").html(mh);
										hora_data = mh;
										$(this).find(".inputtime .controls .minuto #min").val(mmnb);
										$(this).find(".inputtime .controls .minuto .data").html(mmnb);
										minuto_data = mmnb;
										setetime = true;
									}
								}
								var xh = $(this).find(ruta_one).attr("xh");
								if(xh != "null"){

									xh = parseInt(xh);
									var mmnb = parseInt($(this).find(ruta_one).attr("xm"));
									var mhb = (xh * 60)+mmnb;
									var suth = (total_hora*60)+actual_minuto;
									
									if(suth > mhb){
										//current pick time is smaller than min time parameter
										if(xh > 12){
											$(this).find(rutd).val(2);
											$(this).find(".inputtime .controls .uso .data").html("PM");
											uso_data = "PM";
											xh = xh - 12;

										}else{
											$(this).find(rutd).val(1);
											$(this).find(".inputtime .controls .uso .data").html("AM");
											uso_data = "AM";
										}
										total_hora = xh;
										if(mmnb < 10){
											mmnb = "0"+mmnb;
										}
										$(this).find(".inputtime .controls .hora #hour").val(xh);
										$(this).find(".inputtime .controls .hora .data").html(xh);
										hora_data = xh;
										$(this).find(".inputtime .controls .minuto #min").val(mmnb);
										$(this).find(".inputtime .controls .minuto .data").html(mmnb);
										minuto_data = mmnb;
										setetime = true;
									}
								}
								if(setetime == false){
										if(total_hora > 12){
											$(this).find(rutd).val(2);
											$(this).find(".inputtime .controls .uso .data").html("PM");
											uso_data = "PM";
											total_hora = total_hora - 12;
										}else{
											$(this).find(rutd).val(1);
											$(this).find(".inputtime .controls .uso .data").html("AM");
											uso_data = "AM";

										}
										
										if(actual_minuto < 10){
											actual_minuto = "0"+actual_minuto;
										}
										$(this).find(".inputtime .controls .hora #hour").val(total_hora);
										$(this).find(".inputtime .controls .hora .data").html(total_hora);
										hora_data = total_hora;
										$(this).find(".inputtime .controls .minuto #min").val(actual_minuto);
										$(this).find(".inputtime .controls .minuto .data").html(actual_minuto);
										minuto_data = actual_minuto;
								}
								$(this).find(".inputtime .newimputdate .hora").html(actual_hora_txt+hora_data);
								$(this).find(".inputtime .newimputdate .minuto").html(": "+minuto_data);
								$(this).find(".inputtime .newimputdate .uso").html(uso_data);
							}catch(e){

							}
						}
				}
				var ctheme = opts. theme;
						if(ctheme != null){

							if(ctheme == "popup"){
								try{
									$(this).find(rutc).addClass("popupop");
								}catch(e){

								}
							}else if(ctheme == "default"){
								try{
									$(this).find(rutc).removeClass("popupop");
								}catch(e){

								}
							}
						}
			});
		}
		$.fn.davpick_close_all = function(options){
			$(".dav_pickers .inputdate .controls").slideUp();
			actual_abierto = '';
			return true;
		}
		$.fn.davpick = function(options){
			var opts = $.extend($.fn.davpick.defaults, options);
				if(options. type == "date"){
					var mini_year = "null";
					var mini_mon = 0;
					var mini_day = 0;
					var maxi_year = "null";
					var maxi_mon = 0;
					var maxi_day = 0;
					var current_date = opts. current_date;
					current_date = current_date.split("-");
					if(opts. min_date != null){
						var min_date = opts. min_date;
						min_date = min_date.split("-");
						mini_year = parseInt(min_date[0]);
						mini_mon = parseInt(min_date[1]);
						mini_day = parseInt(min_date[2]);
					}
					if(opts. max_date != null){
						var max_date = opts. max_date;
						max_date = max_date.split("-");
						maxi_year = parseInt(max_date[0]);
						maxi_mon = parseInt(max_date[1]);
						maxi_day = parseInt(max_date[2]);
					}
					var thema = options. theme;
					var theme = "";
					if(thema == "popup"){ theme = 'popupop ' }else{ theme =""; }
					this.each(function(){
						
						var id = $(this).attr("id");
						if (typeof id !== typeof undefined && id !== false) {

							$(this).addClass("dav_pickers");

							$(this).html('<div is="'+id+'" class="inputdate"><div class="newimputdate" my="'+mini_year+'" mm="'+mini_mon+'" md="'+mini_day+'" xy="'+maxi_year+'" xm="'+maxi_mon+'" xd="'+maxi_day+'"><div class="val"></div><div class="dia casilla">'+current_date[2]+'</div> <div class="mes casilla">'+meses[current_date[1]-1]+'</div> <div class="aao casilla">'+current_date[0]+'</div> </div> <div class="'+theme+'controls"><div class="vermid"> <div class="renglonx">x</div> <div class="casillas"> <div class="dia casillab"> <div class="arrows"><img de="a" src="dav_pickers/up.png"></div> <div class="data">'+current_date[2]+'</div> <div class="arrows"><img de="b" src="dav_pickers/down.png"></div> <input type="hidden" id="day" value="'+current_date[2]+'"> </div> <div class="mes casillab"> <div class="arrows"><img de="c" src="dav_pickers/up.png"></div> <div class="data">'+meses[current_date[1]-1]+'</div> <div class="arrows"><img de="d" src="dav_pickers/down.png"></div> <input type="hidden" id="mon" value="'+current_date[1]+'"> </div> <div class="ano casillab"> <div class="arrows"><img de="e" src="dav_pickers/up.png"></div> <div class="data">'+current_date[0]+'</div> <div class="arrows"><img de="f" src="dav_pickers/down.png"></div> <input type="hidden" id="year" value="'+current_date[0]+'"> </div> </div> </div></div></div>');
						/* 1 */	$(this).find(rutf).click(function(){
								var this_g_id = id;
								if(actual_abierto != this_g_id){
									$(".inputtime .controls").slideUp();
									$(".inputdate[is!='"+this_g_id+"'] .controls").slideUp();
									$(".inputdate[is='"+this_g_id+"'] .controls").slideDown(function(){
											actual_abierto = this_g_id;
										});	
								}else{
									$(".inputdate[is='"+this_g_id+"'] .controls").slideUp(function(){
										actual_abierto = '';
									});	
								}
							});
						/* 2 */$(this).find('.inputdate .controls .casillab .arrows img').click(function() {
									var comando = $(this).attr("de");
									var id = $(this).parents(ra).attr("is");
									var actual_day = parseInt($(this).parents(rutc).find(".dia #day").val());
									var actual_month = parseInt($(this).parents(rutc).find(".mes #mon").val());
									var actual_year = parseInt($(this).parents(rutc).find(".ano #year").val());

											var mini_year = $(this).parents(ra).find(ri).attr("my");
											var maxi_year = $(this).parents(ra).find(ri).attr("xy");
											var mini_mon = 0;
											var mini_day = 0;
											var maxi_mon = 0;
											var maxi_day = 0;
										if(mini_year != "null"){
											mini_year = parseInt(mini_year);
											mini_mon = parseInt($(this).parents(ra).find(ri).attr("mm"));
											mini_day = parseInt($(this).parents(ra).find(ri).attr("md"));
										}else{
											mini_year = null;
										}
										if(maxi_year != "null"){
											maxi_year = parseInt(maxi_year);
											maxi_mon = parseInt($(this).parents(ra).find(ri).attr("xm"));
											maxi_day = parseInt($(this).parents(ra).find(ri).attr("md"));
										}else{
											maxi_year = null;
										}
									if(comando == "a"){
										if(actual_month == 2){
											if ((actual_year % 4 == 0) && ((actual_year % 100 != 0) || (actual_year % 400 == 0))){
												if(actual_day == 29){
													actual_day = 0;
												}
											}else{
												if(actual_day == cdxm[actual_month-1]){
												actual_day = 0;
												}
											}
										}else{
											if(actual_day == cdxm[actual_month-1]){
												actual_day = 0;
												if(actual_month < 12){
													$(this).parents(rutc).find(".mes #mon").val(actual_month+1);
													$(this).parents(rutc).find(".mes .data").html(meses[actual_month]);
												}else{
													actual_month = 0;
													$(this).parents(rutc).find(".mes #mon").val(actual_month+1);
													$(this).parents(rutc).find(".mes .data").html(meses[actual_month]);
													$(this).parents(rutc).find(".ano #year").val(actual_year+1);
													$(this).parents(rutc).find(".ano .data").html(actual_year+1);
												}
											}
										}
										$(this).parents(rutc).find(".dia #day").val(actual_day+1);
										$(this).parents(rutc).find(".dia .data").html(actual_day+1);
									}else if(comando == "b"){
										if(actual_day == 1){
											if(actual_month > 1){
												
												if((actual_month-1) == 2){
													if ((actual_year % 4 == 0) && ((actual_year % 100 != 0) || (actual_year % 400 == 0))){
														actual_day = 30;
													}else{
														actual_day = cdxm[actual_month-2]+1;
													}
												}else{
													actual_day = cdxm[actual_month-2]+1;
												}
												$(this).parents(rutc).find(".mes #mon").val(actual_month-1);
												$(this).parents(rutc).find(".mes .data").html(meses[actual_month-2]);
												$(this).parents(rutc).find(".dia #day").val(actual_day-1);
												$(this).parents(rutc).find(".dia .data").html(actual_day-1);
											}else if(actual_month == 1){
												$(this).parents(rutc).find(".mes #mon").val(12);
												$(this).parents(rutc).find(".mes .data").html(meses[11]);
												$(this).parents(rutc).find(".ano #year").val(actual_year-1);
												$(this).parents(rutc).find(".ano .data").html(actual_year-1);
												$(this).parents(rutc).find(".dia #day").val(31);
												$(this).parents(rutc).find(".dia .data").html(31);
											}
												
										}else{
											$(this).parents(rutc).find(".dia #day").val(actual_day-1);
											$(this).parents(rutc).find(".dia .data").html(actual_day-1);
										}
										
									}else if(comando == "c"){
										if(actual_month == 12){
											actual_month = 0;
											$(this).parents(rutc).find(".ano #year").val(actual_year+1);
											$(this).parents(rutc).find(".ano .data").html(actual_year+1);
										}
										$(this).parents(rutc).find(".mes #mon").val(actual_month+1);
										$(this).parents(rutc).find(".mes .data").html(meses[actual_month]);
										var max_days = cdxm[actual_month];
										if(actual_day > max_days){
											$(this).parents(rutc).find(".dia #day").val(max_days);
											$(this).parents(rutc).find(".dia .data").html(max_days);
										}

									}else if(comando == "d"){
										if(actual_month == 1){
											actual_month = 13;
											$(this).parents(rutc).find(".ano #year").val(actual_year-1);
											$(this).parents(rutc).find(".ano .data").html(actual_year-1);
										}
										$(this).parents(rutc).find(".mes #mon").val(actual_month-1);
										$(this).parents(rutc).find(".mes .data").html(meses[actual_month-2]);
										var max_days = cdxm[actual_month-2];
										if(actual_day > max_days){
											$(this).parents(rutc).find(".dia #day").val(max_days);
											$(this).parents(rutc).find(".dia .data").html(max_days);
										}
									}else if(comando == "e"){
										var preacty = actual_year+1;
											if(actual_month == 2){
												if ((preacty % 4 == 0) && ((preacty % 100 != 0) || (preacty % 400 == 0))){

												}else{
													if(actual_day == 29){
														$(this).parents(rutc).find(".dia #day").val(28);
														$(this).parents(rutc).find(".dia .data").html(28);
													}
												}
											}



										$(this).parents(rutc).find(".ano #year").val(actual_year+1);
										$(this).parents(rutc).find(".ano .data").html(actual_year+1);
									}else if(comando == "f"){
										var preacty = actual_year+1;
										if(actual_month == 2){
												if ((preacty % 4 == 0) && ((preacty % 100 != 0) || (preacty % 400 == 0))){

												}else{
													if(actual_day == 29){
														$(this).parents(rutc).find(".dia #day").val(28);
														$(this).parents(rutc).find(".dia .data").html(28);
													}
												}
											}
										$(this).parents(rutc).find(".ano #year").val(actual_year-1);
										$(this).parents(rutc).find(".ano .data").html(actual_year-1);
									}
										actual_day = parseInt($(this).parents(rutc).find(".dia #day").val());
										actual_month = parseInt($(this).parents(rutc).find(".mes #mon").val());
										actual_year = parseInt($(this).parents(rutc).find(".ano #year").val());

										if((mini_year != null) || (maxi_year != null)){
											var fecha2 = moment(actual_year+'-'+actual_month+"-"+actual_day);
											
											var dias_a = null;
											var dias_b = null;
											if(mini_year != null){
												var fecha1 = moment(mini_year+'-'+mini_mon+"-"+mini_day);

												dias_a = fecha2.diff(fecha1, 'days');

											}
								            if(maxi_year != null){
												var fecha3 = moment(maxi_year+'-'+maxi_mon+"-"+maxi_day);
												dias_b = fecha3.diff(fecha2, 'days');
												
											}
								           // alert(dias_a+ " - "+dias_b);
								           var sa = "";
											if((mini_year != null) && (dias_a <= 0)){
												$(this).parents(rutc).find(".dia .data").html(mini_day);
												$(this).parents(rutc).find(".mes .data").html(meses[mini_mon-1]);
												$(this).parents(rutc).find(".ano .data").html(mini_year);
												$(this).parents(rutc).find(".dia #day").val(mini_day);
												$(this).parents(rutc).find(".mes #mon").val(mini_mon);
												$(this).parents(rutc).find(".ano #year").val(mini_year);
												$(this).parents(ra).find(rz+".dia").html(mini_day);
												$(this).parents(ra).find(rz+".mes").html(meses[mini_mon-1]);
												$(this).parents(ra).find(rz+".aao").html(mini_year);
												if(mini_mon < 10){ mini_mon = "0"+mini_mon}
												if(mini_day < 10){ mini_day = "0"+mini_day}
												sa = mini_year+"-"+mini_mon+"-"+mini_day;

											}
											if((maxi_year != null) && (dias_b <= 0)){
												
												$(this).parents(rutc).find(".dia #day").val(maxi_day);
												$(this).parents(rutc).find(".mes #mon").val(maxi_mon);
												$(this).parents(rutc).find(".ano #year").val(maxi_year);
												$(this).parents(ra).find(rz+".dia").html(maxi_day);
												$(this).parents(ra).find(rz+".mes").html(meses[maxi_mon-1]);
												$(this).parents(ra).find(rz+".aao").html(maxi_year);
												$(this).parents(rutc).find(".dia .data").html(maxi_day);
												$(this).parents(rutc).find(".mes .data").html(meses[maxi_mon-1]);
												$(this).parents(rutc).find(".ano .data").html(maxi_year);
												if(maxi_mon < 10){ maxi_mon = "0"+maxi_mon}
												if(maxi_day < 10){ maxi_day = "0"+maxi_day}
												sa = maxi_year+"-"+maxi_mon+"-"+maxi_day;
											}
											
										}else{
												$(this).parents(ra).find(rz+".dia").html(actual_day);
												$(this).parents(ra).find(rz+".mes").html(meses[actual_month-1]);
												$(this).parents(ra).find(rz+".aao").html(actual_year);
												if(actual_month < 10){ actual_month = "0"+actual_month}
												if(actual_day < 10){ actual_day = "0"+actual_day}
												sa = actual_year+"-"+actual_month+"-"+actual_day;
											}
									if (typeof options.onchange == 'function') { 
									    options.onchange.call(this,id,sa);
									}
								});
							
						}
					});
				}else if(options. type == "time"){
					var thema = options. theme;
					var theme = "";
					if(thema == "popup"){ theme = 'popupop ' }else{ theme  =""; }
					var mini_h = "null";
					var mini_m = 0;
					var maxi_h = "null";
					var maxi_m = 0;
					var current_time = opts. current_time;
					current_time = current_time.split(":");
					var cu_h = parseInt(current_time[0]);
					var cu_m = parseInt(current_time[1]);
					var cu_u = "1";
					var cu_u_txt = "AM";
					if(cu_h > 12){
						cu_u = "2";
						cu_u_txt = "PM";
						cu_h = cu_h - 12;
					}
					if(cu_h < 10){
						cu_h = cu_h;
					}
					if(cu_m < 10){
						cu_m = "0"+cu_m;
					}
					var intervalo = parseInt(opts. intervalo);
					if(intervalo >= 25){
						intervalo = 30;
					}else if(intervalo < 1){
						intervalo = 1;
					}else if((intervalo > 6) && (intervalo < 25)){
						var multiplos = [6, 10, 10, 10, 12, 12, 12, 15, 15, 15, 15, 20,20,20,20,20,20,20];
						intervalo = multiplos[intervalo-7]
					}
					if(opts. min_time != null){
						var min_time = opts. min_time;
						min_time = min_time.split(":");
						mini_h = parseInt(min_time[0]);
						mini_m = parseInt(min_time[1]);
						if (mini_m % intervalo) {
						   	if (0 > mini_m) {
						        return Math.ceil(mini_m / intervalo) * intervalo;
						    }
						    mini_m = Math.ceil(mini_m / intervalo) * intervalo;
						}
					}
					if(opts. max_time != null){
						var max_time = opts. max_time;
						max_time = max_time.split(":");
						maxi_h = parseInt(max_time[0]);
						maxi_m= parseInt(max_time[1]);
						if (maxi_m % intervalo) {
						   	if (0 > mini_m) {
						        return Math.ceil(maxi_m / intervalo) * intervalo;
						    }
						    maxi_m = Math.floor(maxi_m / intervalo) * intervalo;
						}
					}
					this.each(function(){
						
						var id = $(this).attr("id");
						if (typeof id !== typeof undefined && id !== false) {
							$(this).addClass("dav_pickers");
							$(this).html('<div is="'+id+'" in="'+intervalo+'" class="inputtime"><div class="newimputdate" mh="'+mini_h+'" mm="'+mini_m+'" xh="'+maxi_h+'" xm="'+maxi_m+'"><div class="val"></div><div class="hora casilla">'+cu_h+'</div><div class="minuto casilla">: '+cu_m+'</div><div class="uso casilla">'+cu_u_txt+'</div></div><div class="'+theme+'controls"><div class="vermid"><div class="renglonx">x</div><div class="casillas"><div class="hora casillab"><div class="arrows"><img de="a" src="dav_pickers/up.png"></div><div class="data">'+cu_h+'</div><div class="arrows"><img de="b" src="dav_pickers/down.png"></div><input type="hidden" id="hour" value="'+cu_h+'"></div><div class="minuto casillab"><div class="arrows"><img de="c" src="dav_pickers/up.png"></div><div class="data">'+cu_m+'</div><div class="arrows"><img de="d" src="dav_pickers/down.png"></div><input type="hidden" id="min" value="'+cu_m+'"></div><div class="uso casillab"><div class="arrows"><img de="e" src="dav_pickers/up.png"></div><div class="data">'+cu_u_txt+'</div><div class="arrows"><img de="f" src="dav_pickers/down.png"></div><input type="hidden" id="use" value="'+cu_u+'"></div></div></div></div></div>');
						}


					/* 3 */
					$(this).find('.inputtime .controls .casillab .arrows img').click(function (e) {
						var comando = $(this).attr("de");
						var id = $(this).parents(re).attr("is");
						var inter =  parseInt($(this).parents(re).attr("in"));
							//var actual_day = parseInt($(this).parents(rutc).find("
						if(comando == "a"){
							var actual_hora = parseInt($(this).parents(rutc).find(ro).val());
							var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
							if(actual_hora == 11){
								if(actual_uso == 1){
									$(this).parents(rutc).find(rf).val(2);
									$(this).parents(rutc).find(rd).html("PM");
								}else if(actual_uso == 2){
									$(this).parents(rutc).find(rf).val(1);
									$(this).parents(rutc).find(rd).html("AM");
								}
							}
							if(actual_hora == 12){
								
								actual_hora = 0;

							}
							actual_hora = actual_hora+1;
							actual_hora_txt = actual_hora;
							if(actual_hora < 10){
								actual_hora_txt = actual_hora;
							}
							$(this).parents(rutc).find(ro).val(actual_hora);
							$(this).parents(rutc).find(ru).html(actual_hora_txt);
						}else if(comando == "b"){
							var actual_hora = parseInt($(this).parents(rutc).find(ro).val());
							var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
							
							if(actual_hora == 1){

								actual_hora = 13;
							}
							if(actual_hora == 12){
								if(actual_uso == 1){
									$(this).parents(rutc).find(rf).val(2);
									$(this).parents(rutc).find(rd).html("PM");
								}else if(actual_uso == 2){
									$(this).parents(rutc).find(rf).val(1);
									$(this).parents(rutc).find(rd).html("AM");
								}
							}
							actual_hora = actual_hora-1;
							actual_hora_txt = actual_hora;
							if(actual_hora < 10){
								actual_hora_txt = actual_hora;
							}
							$(this).parents(rutc).find(ro).val(actual_hora);
							$(this).parents(rutc).find(ru).html(actual_hora_txt);
						}else if(comando == "c"){
							var actual_minuto = parseInt($(this).parents(rutc).find(rn).val());
							var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
							if((actual_minuto+inter) == 60){
								actual_minuto = -inter;
								var actual_hora = parseInt($(this).parents(rutc).find(ro).val());
								var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
								if(actual_hora == 11){
									if(actual_uso == 1){
										$(this).parents(rutc).find(rf).val(2);
										$(this).parents(rutc).find(rd).html("PM");
									}else if(actual_uso == 2){
										$(this).parents(rutc).find(rf).val(1);
										$(this).parents(rutc).find(rd).html("AM");
									}
								}
								if(actual_hora == 12){
									
									actual_hora = 0;

								}
								actual_hora = actual_hora+1;
								actual_hora_txt = actual_hora;
								if(actual_hora < 10){
									actual_hora_txt = actual_hora;
								}
								$(this).parents(rutc).find(ro).val(actual_hora);
								$(this).parents(rutc).find(ru).html(actual_hora_txt);

							}
							$(this).parents(rutc).find(rn).val(actual_minuto+inter);
							if((actual_minuto+inter) == 0){
								$(this).parents(rutc).find(rc).html("00");
							}else{
								$(this).parents(rutc).find(rc).html(actual_minuto+inter);
							}		
						}else if(comando == "d"){
							var actual_minuto = parseInt($(this).parents(rutc).find(rn).val());
							if((actual_minuto-inter) < 0){
								actual_minuto = 60;
								var actual_hora = parseInt($(this).parents(rutc).find(ro).val());
								var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
								
								if(actual_hora == 1){

									actual_hora = 13;
								}
								if(actual_hora == 12){
									if(actual_uso == 1){
										$(this).parents(rutc).find(rf).val(2);
										$(this).parents(rutc).find(rd).html("PM");
									}else if(actual_uso == 2){
										$(this).parents(rutc).find(rf).val(1);
										$(this).parents(rutc).find(rd).html("AM");
									}
								}
								actual_hora = actual_hora-1;
								actual_hora_txt = actual_hora;
								if(actual_hora < 10){
									actual_hora_txt = actual_hora;
								}
								$(this).parents(rutc).find(ro).val(actual_hora);
								$(this).parents(rutc).find(ru).html(actual_hora_txt);
							}
							$(this).parents(rutc).find(rn).val(actual_minuto-inter);
							if((actual_minuto-inter) == 0){
								$(this).parents(rutc).find(rc).html("00");
							}else{
								$(this).parents(rutc).find(rc).html(actual_minuto-inter);
							}
						}else if((comando == "e") || (comando == "f")) {

							var actual_uso = parseInt($(this).parents(rutc).find(rf).val());
							if(actual_uso == 1){
								$(this).parents(rutc).find(rf).val(2);
								$(this).parents(rutc).find(rd).html("PM");
							}else if(actual_uso == 2){
								$(this).parents(rutc).find(rf).val(1);
								$(this).parents(rutc).find(rd).html("AM");
							}
							
						}
						actual_hora = parseInt($(this).parents(rutc).find(ro).val());
						var actual_hora_txt = "";
						var total_hora = actual_hora;
						if($(this).parents(rutc).find(rf).val() == "2"){
							total_hora = actual_hora+12;
							if(actual_hora == 12){
								total_hora = 12;
							}
						}else{
							if(actual_hora == 12){
								total_hora = 0;
							}
						}
						var mh = $(this).parents(re).find(ri).attr("mh");
						if(mh != "null"){

							mh = parseInt(mh);
							var mmnb = parseInt($(this).parents(re).find(ri).attr("mm"));
							var mhb = (mh * 60)+mmnb;
							var suth = (total_hora*60)+parseInt($(this).parents(rutc).find(rn).val());
							
							if(suth < mhb){
								//current pick time is smaller than min time parameter
								if(mh > 12){
									$(this).parents(rutc).find(rf).val(2);
									$(this).parents(rutc).find(rd).html("PM");
									mh = mh - 12;

								}else{
									$(this).parents(rutc).find(rf).val(1);
									$(this).parents(rutc).find(rd).html("AM");
								}
								total_hora = mh;
								if(mmnb < 10){
									mmnb = "0"+mmnb;
								}
								$(this).parents(rutc).find(ro).val(mh);
								$(this).parents(rutc).find(ru).html(mh);
								$(this).parents(rutc).find(rn).val(mmnb);
								$(this).parents(rutc).find(rc).html(mmnb);
							}

						}
						var xh = $(this).parents(re).find(ri).attr("xh");
						if(xh != "null"){

							xh = parseInt(xh);
							var mmnb = parseInt($(this).parents(re).find(ri).attr("xm"));
							var mhb = (xh * 60)+mmnb;
							var suth = (total_hora*60)+parseInt($(this).parents(rutc).find(rn).val());
							
							if(suth > mhb){
								//current pick time is smaller than min time parameter
								if(xh > 12){
									$(this).parents(rutc).find(rf).val(2);
									$(this).parents(rutc).find(rd).html("PM");
									xh = xh - 12;

								}else{
									$(this).parents(rutc).find(rf).val(1);
									$(this).parents(rutc).find(rd).html("AM");
								}
								total_hora = xh;
								if(mmnb < 10){
									mmnb = "0"+mmnb;
								}
								$(this).parents(rutc).find(ro).val(xh);
								$(this).parents(rutc).find(ru).html(xh);
								$(this).parents(rutc).find(rn).val(mmnb);
								$(this).parents(rutc).find(rc).html(mmnb);
							}

						}

						$(this).parents(re).find(rz+".hora").html(actual_hora_txt+$(this).parents(rutc).find(ru).html());
						$(this).parents(re).find(rz+".minuto").html(": "+$(this).parents(rutc).find(rc).html());
						$(this).parents(re).find(rz+".uso").html($(this).parents(rutc).find(rd).html());
						if(typeof options.onchange == 'function') { 
							options.onchange.call(this,id,total_hora+":"+$(this).parents(rutc).find(rc).html()+":00");
						}
					});	
					/* end 3*/	
					});
				}

		};

// definimos los parámetros junto con los valores por defecto de la función
		$.fn.davpick.defaults = {

		    type: 'date', min_date: null, max_date: null, current_date: '2017-12-11', theme: null, current_time: '14:00:00', intervalo: '10', min_time: null, max_time: null, ondatachange: null
		};
		$(document).on('click', '.dav_pickers .controls .renglonx', function () {
			$(this).parent().parent().slideUp();
			actual_abierto = '';
		});
		$(document).on('click', '.dav_pickers .inputtime .newimputdate', function () {
			var this_g_id = $(this).parent().attr("is");
			//alert(this_g_id);
			if(actual_abierto != this_g_id){
				//$(".inputdate[is!='Hot Fuzz'] .controls")
				$(".inputdate .controls").slideUp();
				$(".inputtime[is!='"+this_g_id+"'] .controls").slideUp();
				$(".inputtime[is='"+this_g_id+"'] .controls").slideDown(function(){
						actual_abierto = this_g_id;
					});	
			}else{
				$(".inputtime[is='"+this_g_id+"'] .controls").slideUp(function(){
					actual_abierto = '';
				});	
			}
		});
		

		
		sumaFecha = function(d, fecha)
		{
		 var Fecha = new Date();
		 var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
		 var sep = sFecha.indexOf('/') != -1 ? '/' : '-'; 
		 var aFecha = sFecha.split(sep);
		 var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
		 fecha= new Date(fecha);
		 fecha.setDate(fecha.getDate()+parseInt(d));
		 var anno=fecha.getFullYear();
		 var mes= fecha.getMonth()+1;
		 var dia= fecha.getDate();
		 mes = (mes < 10) ? ("0" + mes) : mes;
		 dia = (dia < 10) ? ("0" + dia) : dia;
		 var fechaFinal = dia+sep+mes+sep+anno;
		 return (fechaFinal);
		 };
		

})(jQuery)
