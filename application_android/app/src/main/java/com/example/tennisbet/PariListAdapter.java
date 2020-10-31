package com.example.tennisbet;

import android.content.Context;
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

        //TODO set les élements de la vue avec ce qui est défini au dessus

        return convertView;
    }
}
