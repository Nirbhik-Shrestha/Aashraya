import { Card, CardContent } from './ui/card';


const JournalCard = () => (
  <Card>
    <CardContent className="p-4">
      <img src="/journal_cover.jpg" alt="Journal" className="rounded-md mb-2" />
      <p className="text-sm">Journal of Mental Health, Volume 34</p>
    </CardContent>
  </Card>
);

export default JournalCard;
