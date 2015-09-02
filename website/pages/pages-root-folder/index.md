---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#

isFrontPage: "yes"

layout: frontpage
header:

widget1:
  title: "Learn Data Science"
  url: '/apply'
  image: frontpage_widget_learn_302x182_plots.png
  text: 'We teach Math, Programming, and Data from the ground up. Whether student or working professional, our <a href="/curriculum/">curriculum</a> fits you.'

widget2:
  title: "Teach People"
  url: '/volunteer/'
  text: 'Transfer your knowledge! We are looking for volunteers, and teaching is a requirement for advancing students.'
  image: frontpage_widget_teach_302x182_inverted.jpg

widget3:
  title: "Our Mission"
  url: '/start_a_hub'
  image: frontpage_widget_philosophy_302x182.png
  text: 'Maximize intellectual growth and minimize burnout. Keep classes affordable, small, and personalized. Be nonprofit and open-source.'

permalink: /index.html
---

<script>
startNetwork(5);
</script>

<div id="videoModal" class="reveal-modal large" data-reveal="">
  <div class="flex-video widescreen vimeo" style="display: block;">
    <iframe width="1280" height="720" src="https://www.youtube.com/embed/3b5zCFSmVvU" frameborder="0" allowfullscreen></iframe>
  </div>
  <a class="close-reveal-modal">&#215;</a>
</div>
