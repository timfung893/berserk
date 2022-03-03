import React from "react";
import ReactPlayer from "react-player/lazy";
import "./About.css";

const About = () => {
  return (
    <div>
      <div className="container-fluid py-5 bg2">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bolder about-title">
              The Legend Of Berserk
            </h1>
          </div>
        </div>
      </div>
      <div className="container my-5 justify-content-between">
        <div className="row ">
          <div className="col-md-4 about-img-container">
            <img src="./img/about-desc.jpg" alt="" className="about-img" />
          </div>
          <div className="col-md-8 about">
            <h2>One Of The Best Ever!</h2>
            <p className="about-desc py-4">
              When asked to recommend fantasy texts (especially of the grimdark
              variety), there is always one franchise that comes to mind, and
              that is Kentaro Miura’s manga series, Berserk. Set in a
              medieval-styled fantasy world, the story centres around the
              protagonist, Guts, a hulking mercenary, and his adversary
              (once-friend), Griffith, the charismatic leader of the mercenary
              band, Band of the Hawk.
              <br></br>
              <br></br>
              Miura advances the story in “arcs”, short serialised fragments
              that usually span three to five manga volumes. Each arc elegantly
              weaves this dark tale of Guts upon a blood-soaked tapestry, Miura
              sending him across the hostile Midland, having Guts battle the
              inhuman apostles and their cenobite-inspired monarchs, the God
              Hand. I appreciate this format, especially in manga form, as it
              allows Miura to explore and examine a diverse assortment of
              landscapes (dreamscapes as well) and characters, some even
              impacting Guts long-term. Some arcs are stronger than others (the
              second, The Golden Age arc is arguably the strongest), but it
              would be glib to avoid specific storylines. Each arc fleshes out
              Miura’s world and further fleshes out Guts from a baby born of a
              hanged woman to the lonesome warrior in search for meaning in a
              chaotic world.
            </p>
          </div>
        </div>
        <div className="row about-desc2-container">
          <img src="./img/about-img1.jpg" alt="" />
          <p className="about-desc py-4">
            While the story of Berserk is wonderful, it is nothing without
            Miura’s artistry. Miura combines such elements of Zdzisław Beksiński
            and M.C. Escher, the pen strokes, effective in depicting the pain of
            Guts as he wages war on his enemies. There is a raw savagery when
            Guts swings his absurdly huge sword, Dragon Slayer. Though the later
            volumes are drawn digitally, Miura never strays far from this
            savagery that has become so integral to his series, one might even
            call it, berserk!
            <br></br>
            <br></br>
            There have been several attempts at adapting Berserk into an anime,
            but they are mostly middling. The earliest adapted in 1997 by OLM,
            Inc. is perhaps the most respectable to the manga as it retains
            Miura’s hand drawn panels. In depicting The Golden Age arc, the
            story itself remains intact and true to the manga, and to see Guts
            and Griffith’s developing friendship and respect, only for it to be
            tragically torn away at the end of the series remains effective and
            brutal. The quality of the animation hasn’t aged well, especially in
            relation to other anime of the late 90’s, but Miura’s story remains
            supreme, and that is what is most important after all.
          </p>
          {/* <iframe
            title="trailer"
            width="550"
            height="200"
            src="https://www.youtube.com/watch?v=IXL5r3n862U&ab_channel=AnimeClips"
            frameborder="0"
            allowFullScreen="allowfullscreen"
          ></iframe> */}
          <ReactPlayer
            url="https://youtu.be/IXL5r3n862U"
            className="about-video mx-auto"
            controls={true}
          />
          <p className="about-desc mt-4 mb-0">
            For those wanting to lose themselves into Berserk, I fully recommend
            reading the manga series first and foremost. Berserk truly shines on
            the page as Guts, Griffith, the apostles, and other motley
            assortment of characters truly live and breathe in manga form. It is
            brutal and at times, rough to read, but for those with darker
            tastes, there is nothing greater than relishing in Miura’s dark
            fantasy. With over thirty-nine volumes released, there is much to
            read! But do so slowly as the story just gets better and better when
            the end draws near.
            <br></br>
            <br></br>
            Allow the strand of causality to reel you in and follow Guts on a
            journey to defy destiny and to remain human in an inhuman world.
            <br></br>
            <span className="about-desc-span">(by grimdarkmagazine)</span>
          </p>
          <h4 className="mt-4 mb-0 readIt">READ BERSERK BY KENTARO MIURA</h4>
        </div>
      </div>
    </div>
  );
};

export default About;
