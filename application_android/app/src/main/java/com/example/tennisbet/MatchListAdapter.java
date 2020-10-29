package com.example.tennisbet;

import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.GridLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.example.tennisbet.models.Joueur;
import com.example.tennisbet.models.Manche;
import com.example.tennisbet.models.Partie;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class MatchListAdapter extends ArrayAdapter<Partie> {

    private static final String TAG = "PersonListAdapter";

    private Context mContext;
    int mRessource;

    public MatchListAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Partie> objects) {
        super(context, resource, objects);
        this.mContext = context;
        this.mRessource = resource;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        //get match informations
        int id = getItem(position).getId();
        Joueur joueur1 = getItem(position).getJoueur_1();
        Joueur joueur2 = getItem(position).getJoueur_2();
        int etatMatch = getItem(position).getEtat_partie();
        LocalDateTime date_debut = getItem(position).getDatetime_debut_partie();
        LocalDateTime date_fin = getItem(position).getDateTime_fin_partie();
        ArrayList<Manche> liste_manches = getItem(position).getScore_manche();

        //Create match object
        Partie partie = new Partie(id, joueur1, joueur2, date_debut, date_fin);

        LayoutInflater inflater = LayoutInflater.from(mContext);
        convertView = inflater.inflate(mRessource, parent, false);

        TextView tv_joueur1 = (TextView) convertView.findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = (TextView) convertView.findViewById(R.id.tv_joueur2);
        TextView tv_heure_match= (TextView) convertView.findViewById(R.id.tv_heure_match);
        GridLayout gl_score_manche = (GridLayout) convertView.findViewById(R.id.gl_score_manches);

        TextView tv_score_set_r1_c1 = (TextView) convertView.findViewById(R.id.tv_score_set_r1_c1);
        TextView tv_score_set_r1_c2 = (TextView) convertView.findViewById(R.id.tv_score_set_r1_c2);
        TextView tv_score_set_r1_c3 = (TextView) convertView.findViewById(R.id.tv_score_set_r1_c3);
        TextView tv_score_set_r2_c1 = (TextView) convertView.findViewById(R.id.tv_score_set_r2_c1);
        TextView tv_score_set_r2_c2 = (TextView) convertView.findViewById(R.id.tv_score_set_r2_c2);
        TextView tv_score_set_r2_c3 = (TextView) convertView.findViewById(R.id.tv_score_set_r2_c3);


        if(etatMatch == 0)
        {
            gl_score_manche.setVisibility(View.GONE);
            tv_heure_match.setVisibility(View.VISIBLE);
            tv_heure_match.setText(date_debut.getHour() + " : " + date_debut.getMinute());
        }
        else
        {
            gl_score_manche.setVisibility(View.VISIBLE);
            tv_heure_match.setVisibility(View.GONE);

            int nb_manches_joue = liste_manches.size();

            switch(nb_manches_joue) {
                case 1:
                    tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                    tv_score_set_r1_c3.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c3.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_2()));
                    break;
                case 2:
                    tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                    tv_score_set_r1_c2.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c2.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_2()));

                    tv_score_set_r1_c3.setText(Integer.toString(liste_manches.get(1).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c3.setText(Integer.toString(liste_manches.get(1).getScore_jeux_joueur_2()));
                    break;
                case 3:
                    tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                    tv_score_set_r1_c1.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c1.setText(Integer.toString(liste_manches.get(0).getScore_jeux_joueur_2()));

                    tv_score_set_r1_c2.setText(Integer.toString(liste_manches.get(1).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c2.setText(Integer.toString(liste_manches.get(1).getScore_jeux_joueur_2()));

                    tv_score_set_r1_c3.setText(Integer.toString(liste_manches.get(2).getScore_jeux_joueur_1()));
                    tv_score_set_r2_c3.setText(Integer.toString(liste_manches.get(2).getScore_jeux_joueur_2()));
                    break;
            }
        }

        tv_joueur1.setText(joueur1.getPrenom().charAt(0) + "." + joueur1.getNom() + " (" + joueur1.getRang() + ")");
        tv_joueur2.setText(joueur2.getPrenom().charAt(0) + "." + joueur2.getNom() + " (" + joueur2.getRang() + ")");

        return convertView;
    }
}
