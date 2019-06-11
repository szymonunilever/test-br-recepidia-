/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import PageListingItem from '../PageListingItem';

describe('<PageListingItem />', () => {
  const props = {
    page: {
      title: 'custom title',
      path: 'link',
      image: { alt: 'alt' },
      localImage: {
        aspectRatio: 1,
        base64:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgBLAEsAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9MooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKzm1Us7eRayTRqcFx0/CgDRoqG3uY7i3E6HCd89vrVL+1x/rPs0v2fOPN/+tQBp0VG80ccBmZvkA3Z9qpJq2XQy20kUTnCyN0oA0aKKKACiiigAoqpd3y2zpGsbSyvyEX0pLW/E8xhkheGUDO1u49qALlFU7q/8iYQxQvNLjJVew96ktLtLuMkKUdThkbqDQBYoqhPqRjnaKG3edk++V6CrNtcpdQCWPODwQeoNAE1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAjDcpXpkY4qhLPBo9vFFtkYHO3p+v51ekZlidlGWAJA9TUFrcJeWYkYLgg7l7CgDPUlNBnlyP3pLYU9MkDFaSwL9hEGPl8vbj8KzIYt+j3gjBKGRig9hj/CtAXSf2YLjcMeXn8cdPzoAzixl0O1Qk/PIIz9Mn/CtHUI1fTplxwEJH4c1QeNotCt22nMbCQj8f/r1c1GdF02RgwIkXavvmgCxauZLSFyclkUn8qr6jJcQRLPC3yocumByKsW6GO2iQ9VQA/lTL2dLe0kkcAjGAp7k9qAKz3j3N1BDaPhSN8jYBwPStGsXSQbO5a3mQK8qh1Pr7VtUAV5IooZpL1txZYyCPYc8VRt7pNQ1SOSMbFhQ8MeWzVxbs/2i9q4AG0Mh9agmVP7btigAfaxfHpjjNADrAbrq9lPUy7M/SiMeXrcoHAkhDH6g4pLJhHfXkJ4JfzB7g0QsJtZndeVjjEeffOaAF0gZtGl7ySMxP40WI8u+voh90OrAfUc0mlMFglgPDRSMCD6UaefNuryccqzhVPrgUAaFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVQk0e1kkL/ADpuOSqtgGr9FADI4khiWNFCoowBVP8Ase083fh9uc7N3y1fooARkV0KMAVIwR7VSi0m1imEgDttOVVmyBV6igAqC4tI7mSJpC2IzkKDwT71PRQBXubSO5aNmLK8ZyrKeasUUUAVrqxhvNvmAhl6MpwRRa2MNmWMYYu3VmOTVmigCrdWEN2ys+5XXgMhwaktraK1i8uJcDqSepNTUUAU7nTLe6l8xt6uRglDjP1qzDDHBEsca7VHQU+igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisyCUpBFMvntiPdLvLYPy54z7+lAGnRVZZJw/lv5ZdoyyFQcAjHB/MUz7dvBCKMlV2E9Cxxx+G4UAXKKpzXciTSKiFhHgECNmLcZ4I4HWpS8rXZjQoEVVYkgknJPHX2oAnpCwBAJAJOB71Ut7uSZ0Ow7H5H7tht7jJPBpokllktJG2eW7llAByPkbGfWgC6WAIBIBJwPelqtd799t5e3d5vG7p91qQ3EixSMwUmJ8PgcFcA5H4H9KALVFRRSGVnIx5YOFI7+p/p+FRLNIs9wohlkAcYKlcD5V45I/yaALVFZ5BktRKzSq/nbceYRgeZjHBx04p9xvhlh8tnKxo7lSxO4ArnOevBOKALtFUoZGlvhIHPlOjhFzwQCvP6n8KntGLWcDMSSY1JJ78UATUVXcGW6MRdlRUDYViNxJPcc8Y/WiYFEiiWRgHfaXJ5AwT1/DFAFiiqM+63SZEkcgwO43MSVI9+vf9KiuJZfs0luHYSRKzM4PO0DIOffj9aANOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmrGqRiNR8gG0DrxTqKAI4reOEkopBIxySePTmkFtCoXCD5WLL7E1LRQBE9vHI+5gc9DhiM/XHWnhFEhcD5iACfYZx/M06igCJbeNH3qCD1xuOB9B0pFtYVkEgT5lJI+Y4GeuB+NTUUARywxzBRIudp3DkjB/CmPCUgMcAUbs5LE8Z6n3NT0UANjjWKNY0GFUYFCoqliBgscn3OAP6CnUUAM8mPZs2/Lu34z3zu/nSlFMgcj5gCAfY4z/ACFOooAaUUyByPmAIB9jjP8AIVHHaxwldnmAKMAGRiB+BOKmooAiNtEURNpAQYUhiCB9RzSmGMxeUVynoTUlFAEK20Ko6bSQ4w2WJJH1PNSOiyRsjDKsCCPanUUAFFFFAH//2Q==',
        sizes: '(max-width: 300px) 10vw, 300px',
        src: '/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg',
        srcSet:
          '/static/17960958527413a2fca4ac3a7e0fe78d/d278e/knorr.jpg 1vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/8539d/knorr.jpg 20vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/bc3a8/knorr.jpg 800w,↵/static/17960958527413a2fca4ac3a7e0fe78d/81ef8/knorr.jpg 11vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/989b1/knorr.jpg 1600w,↵/static/17960958527413a2fca4ac3a7e0fe78d/c82f6/knorr.jpg 220vw,↵/static/17960958527413a2fca4ac3a7e0fe78d/65c7d/knorr.jpg 4009w',
      },
    },
  };

  it('Should render title', () => {
    const wrapper = shallow(<PageListingItem page={props.page} />);

    expect(
      wrapper.find('.page-listing__title').contains(props.page.title)
    ).toBeTruthy();
  });

  it('Should render <Image/>', () => {
    const wrapper = shallow(<PageListingItem {...props} />);

    expect(wrapper.find('Image')).toHaveLength(1);
  });
});
