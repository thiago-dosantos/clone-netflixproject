'use client';
import React, { useEffect, useState } from 'react';
import Tmdb from '@/libs/Tmdb';
import MovieRow from '@/components/MovieRow';
import FeaturedMovie from '@/components/FeaturedMovie';
import { Ring } from '@uiball/loaders'
import Footer from '@/components/Footer';

interface Movie {
  slug: string;
  title: string;
  items: any;
}

const ListMovies = () => {
  
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [featureData, setFeatureData] = useState<any>(null); // Tipo any para featureData por enquanto, pode ser ajustado conforme necessário

  useEffect(() => {
    const loadAll = async () => {
      // take list
      let list: Movie[] = await Tmdb.getHomeList(); // Assumindo que getHomeList retorna um array de Movie
      setMovieList(list);

      // take feature
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className='text-white mx-auto h-full'>

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className='mt-[-130px]'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      {movieList.length <= 0 && 
        <div className="fixed left-0 top-0 bottom-0 right-0 z-[99] bg-zinc-900 flex justify-center items-center">
          <Ring
          size={100}
          lineWeight={5}
          speed={1} 
          color="red" 
          />
        </div>
      }
      <Footer />
    </div>
  );
};

ListMovies.displayName = 'ListMovies';

export default ListMovies;
