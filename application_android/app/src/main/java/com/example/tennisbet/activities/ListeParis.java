package com.example.tennisbet.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.ListView;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.PariListAdapter;
import com.example.tennisbet.R;
import com.example.tennisbet.httpUtils.HttpRecupererParis;
import com.example.tennisbet.modele.Pari;
import com.example.tennisbet.modele.Utilisateur;

import java.util.ArrayList;

public class ListeParis extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_paris);

        Utilisateur utilisateur = ((MyApplication) getApplicationContext()).utilisateur;

        new HttpRecupererParis(new HttpRecupererParis.AsyncResponse(){
            @Override
            public void processFinish(ArrayList<Pari> listParis){
                //Here we receive the result fired from async class of onPostExecute(result) method.
                PariListAdapter adapter = new PariListAdapter(MyApplication.getAppContext() ,R.layout.list_paris_layout, listParis);

                ListView list = findViewById(R.id.lv_paris);
                list.setAdapter(adapter);

            }
        }, utilisateur).execute();
    }
}