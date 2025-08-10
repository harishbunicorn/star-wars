import type { Meta, StoryObj } from '@storybook/react';
import MovieDetail from '@/components/movies/MovieDetail';
import { Movie } from '@/types/movie';

const mockMovie: Movie = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: `It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire's
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....`,
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  characters: [
    'https://swapi.info/api/people/1',
    'https://swapi.info/api/people/2',
    'https://swapi.info/api/people/3',
    'https://swapi.info/api/people/4',
    'https://swapi.info/api/people/5'
  ],
  planets: [
    'https://swapi.info/api/planets/1',
    'https://swapi.info/api/planets/2',
    'https://swapi.info/api/planets/3'
  ],
  starships: [
    'https://swapi.info/api/starships/2',
    'https://swapi.info/api/starships/3',
    'https://swapi.info/api/starships/5'
  ],
  vehicles: [
    'https://swapi.info/api/vehicles/4',
    'https://swapi.info/api/vehicles/6'
  ],
  species: [
    'https://swapi.info/api/species/1',
    'https://swapi.info/api/species/2'
  ],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.info/api/films/1',
};

const meta = {
  title: 'Movies/MovieDetail',
  component: MovieDetail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onBack: () => {},
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MovieDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};

export const EpisodeV: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'The Empire Strikes Back',
      episode_id: 5,
      opening_crawl: `It is a dark time for the
Rebellion. Although the Death
Star has been destroyed,
Imperial troops have driven the
Rebel forces from their hidden
base and pursued them across
the galaxy.

Evading the dreaded Imperial
Starfleet, a group of freedom
fighters led by Luke Skywalker
has established a new secret
base on the remote ice world
of Hoth.

The evil lord Darth Vader,
obsessed with finding young
Skywalker, has dispatched
thousands of remote probes into
the far reaches of space....`,
      director: 'Irvin Kershner',
      release_date: '1980-05-17',
    },
  },
};

export const EpisodeIX: Story = {
  args: {
    movie: {
      ...mockMovie,
      title: 'The Rise of Skywalker',
      episode_id: 9,
      director: 'J.J. Abrams',
      producer: 'Kathleen Kennedy, J.J. Abrams, Michelle Rejwan',
      release_date: '2019-12-20',
      opening_crawl: `The dead speak! The galaxy has
heard a mysterious broadcast, a
threat of REVENGE in the sinister
voice of the late EMPEROR
PALPATINE.

GENERAL LEIA ORGANA dispatches
secret agents to gather
intelligence, while REY, the last
hope of the Jedi, trains for
battle against the diabolical
FIRST ORDER.

Meanwhile, Supreme Leader KYLO
REN rages in search of the
phantom Emperor, determined to
destroy any threat to his power....`,
    },
  },
};