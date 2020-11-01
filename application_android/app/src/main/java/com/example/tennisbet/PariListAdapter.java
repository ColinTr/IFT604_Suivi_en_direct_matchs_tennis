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

import com.example.tennisbet.modele.Joueur;
import com.example.tennisbet.modele.Pari;

import java.util.ArrayList;

public class PariListAdapter extends ArrayAdapter<Pari> {

    private Context mContext;
    int mRessource;

    public PariListAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Pari> objects) {
        super(context, resource, objects);
        this.mContext = context;
        this.mRessource = resource;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        //View view = super.getView(position, convertView, parent);
        //get pari informations
        int id = getItem(position).getId();
        Joueur joueur1 = getItem(position).getJoueur1();
        Joueur joueur2 = getItem(position).getJoueur2();
        int joueurGagnant = getItem(position).getJoueur_gagnant();
        double montantGagne = getItem(position).getMontant_gagne();
        int numJoueurParie = getItem(position).getNum_joueur_parie();
        double montantParie = getItem(position).getMontant_parie();

        //Create pari object
        Pari pari = new Pari(id, null, montantParie, montantGagne, joueur1, joueur2, null, numJoueurParie, joueurGagnant);

        LayoutInflater inflater = LayoutInflater.from(mContext);
        convertView = inflater.inflate(mRessource, parent, false);

        //TODO appel des elements de la vue avec findViewId
        TextView tv_joueur1 = (TextView) convertView.findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = (TextView) convertView.findViewById(R.id.tv_joueur2);
        TextView tv_montant_mise = (TextView) convertView.findViewById(R.id.tv_montant_mise);
        TextView tv_prediction_joueur = (TextView) convertView.findViewById(R.id.tv_prediction_joueur);
        TextView tv_joueur_gagnant = (TextView) convertView.findViewById(R.id.tv_joueur_gagnant);
        TextView tv_gain_realise = (TextView) convertView.findViewById(R.id.tv_gain_realise);

        //TODO set les élements de la vue avec ce qui est défini au dessus
        tv_joueur1.setText(joueur1.getPrenom().charAt(0) + "." + joueur1.getNom() + " (" + joueur1.getRang() + ")");
        tv_joueur2.setText(joueur2.getPrenom().charAt(0) + "." + joueur2.getNom() + " (" + joueur2.getRang() + ")");
        tv_montant_mise.setText(montantParie+" euros");

        if(numJoueurParie == 1){
            tv_prediction_joueur.setText(joueur1.getPrenom().charAt(0) + "." + joueur1.getNom() + " (" + joueur1.getRang() + ")");
        }
        else {
            tv_prediction_joueur.setText(joueur2.getPrenom().charAt(0) + "." + joueur2.getNom() + " (" + joueur2.getRang() + ")");
        }

        switch (joueurGagnant)
        {
            case 0 :
                tv_joueur_gagnant.setText("Partie non terminée");
                break;
            case 1 :
                tv_joueur_gagnant.setText(joueur1.getPrenom().charAt(0) + "." + joueur1.getNom() + " (" + joueur1.getRang() + ")");
                break;
            case 2 :
                tv_joueur_gagnant.setText(joueur2.getPrenom().charAt(0) + "." + joueur2.getNom() + " (" + joueur2.getRang() + ")");
                break;
            default :
                //Ne devrait jamais arriver
        }

        //Si la partie n'a pas de gagnant, pas de gain
        if(joueurGagnant == 0)
        {
            tv_gain_realise.setText("Partie non terminée");
        }
        else
        {
            tv_gain_realise.setText(montantGagne - montantParie+" euros");
        }

        if (position % 2 == 1) {
            convertView.setBackgroundColor(mContext.getResources().getColor(R.color.colorRow));
        } else {
            convertView.setBackgroundColor(Color.WHITE);
        }

        return convertView;
    }
}
