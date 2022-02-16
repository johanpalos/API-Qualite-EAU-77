SELECT code_station, "FID", libelle_support, date_prelevement, code_parametre, libelle_parametre, resultat, symbole_unite, mnemo_remarque, limite_quantification, libelle_qualification, station_77_id, station_77_coordonnee_x, station_77_coordonnee_y, station_77_longitude, station_77_latitude, position, max(resultat) OVER (PARTITION BY code_station) 
	FROM public.mesures_stations_final;
