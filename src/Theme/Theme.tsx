const themes = ["theme_barbie", "theme_lockwood", "theme_jellyfish"];
//매번 새로 만들 필요가 없는 값이라 밖에 씀, 이걸 저 안에넣으면 주문할때마다 메뉴판을 새로 만드느꼴

function Theme() {
  const random_number = Math.floor(Math.random()*themes.length);
  //math.random은 무작위 소수를 만들기 때문데 floor 사용 , *themes.length는 0부터 리스트의 길이(여기선 3)미만의 숫자로 범위를 정해줌
  return themes[random_number];
}

export default Theme;